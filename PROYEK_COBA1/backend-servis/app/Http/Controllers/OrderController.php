<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Order::query();

        if ($user->isCustomer()) {
            $query->where('customer_id', $user->id);
        } elseif ($user->isTechnician() && $user->technician) {
            $query->where('technician_id', $user->technician->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->with(['customer', 'technician', 'photos', 'payment', 'review'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => [
                'items' => OrderResource::collection($orders->items()),
                'meta' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    public function store(CreateOrderRequest $request): JsonResponse
    {
        $user = $request->user();

        $order = Order::create([
            'customer_id' => $user->id,
            'technician_id' => $request->technician_id,
            'category' => $request->category,
            'device_model' => $request->device_model,
            'problem_description' => $request->problem_description,
            'service_type' => $request->service_type,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => 'PENDING',
        ]);

        // Save photos
        if ($request->has('photos') && is_array($request->photos)) {
            foreach ($request->photos as $photoUrl) {
                if ($photoUrl) {
                    OrderPhoto::create([
                        'order_id' => $order->id,
                        'photo_url' => $photoUrl,
                    ]);
                }
            }
        }

        // Create notification for technician if assigned
        if ($order->technician_id) {
            $technician = $order->technician;
            if ($technician && $technician->user) {
                Notification::create([
                    'user_id' => $technician->user->id,
                    'title' => 'Order Baru',
                    'body' => "Anda mendapat order baru dari {$user->name}",
                    'type' => 'ORDER_UPDATE',
                    'related_id' => (string) $order->id,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => new OrderResource($order->load(['customer', 'technician', 'photos'])),
        ], 201);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::with(['customer', 'technician', 'photos', 'payment', 'review'])
            ->findOrFail($id);

        // Check authorization
        if ($user->isCustomer() && $order->customer_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        if ($user->isTechnician() && $order->technician_id !== $user->technician?->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => new OrderResource($order),
        ]);
    }

    public function accept(Request $request, int $id): JsonResponse
    {
        $user = $request->user()->load('technician');
        $order = Order::findOrFail($id);
        $userTechId = $user->technician?->id;

        // Hanya teknisi yang boleh
        if (!$user->isTechnician() || !$userTechId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Jika belum ada teknisi, set teknisi sekarang
        if (!$order->technician_id) {
            $order->technician_id = $userTechId;
            $order->save();
        }

        // Pastikan order ini memang milik teknisi yang login
        if ($order->technician_id !== $userTechId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        if ($order->status !== 'PENDING') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be accepted in current status',
            ], 400);
        }

        $order->update([
            'status' => 'IN_NEGOTIATION', // masuk fase negosiasi harga
        ]);

        $user->technician->update(['status' => 'ON_DUTY']);

        // Notification ke customer
        Notification::create([
            'user_id' => $order->customer_id,
            'title' => 'Order Diterima',
            'body' => "Teknisi telah menerima order Anda",
            'type' => 'ORDER_UPDATE',
            'related_id' => (string) $order->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order accepted successfully',
            'data' => new OrderResource($order->fresh()->load(['customer', 'technician'])),
        ]);
    }

    public function reject(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        if ($order->technician_id !== $user->technician?->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $order->update([
            'status' => 'REJECTED',
        ]);

        // Create notification
        Notification::create([
            'user_id' => $order->customer_id,
            'title' => 'Order Ditolak',
            'body' => "Teknisi telah menolak order Anda",
            'type' => 'ORDER_UPDATE',
            'related_id' => (string) $order->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order rejected successfully',
            'data' => new OrderResource($order->fresh()),
        ]);
    }

    public function start(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        if ($order->technician_id !== $user->technician?->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $order->update([
            'status' => 'ON_PROGRESS',
        ]);

        Notification::create([
            'user_id' => $order->customer_id,
            'title' => 'Servis Dimulai',
            'body' => "Teknisi telah mulai mengerjakan servis Anda",
            'type' => 'ORDER_UPDATE',
            'related_id' => (string) $order->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order started successfully',
            'data' => new OrderResource($order->fresh()),
        ]);
    }

    public function complete(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        if ($order->technician_id !== $user->technician?->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $order->update([
            'status' => 'COMPLETED',
            'completed_at' => now(),
        ]);

        Notification::create([
            'user_id' => $order->customer_id,
            'title' => 'Servis Selesai',
            'body' => "Servis Anda telah selesai. Silakan lakukan pembayaran dan berikan review.",
            'type' => 'ORDER_UPDATE',
            'related_id' => (string) $order->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order completed successfully',
            'data' => new OrderResource($order->fresh()),
        ]);
    }

    public function cancel(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        // Check authorization
        $canCancel = false;
        if ($user->isCustomer() && $order->customer_id === $user->id) {
            $canCancel = true;
        } elseif ($user->isTechnician() && $order->technician_id === $user->technician?->id) {
            $canCancel = true;
        } elseif ($user->isAdmin()) {
            $canCancel = true;
        }

        if (!$canCancel) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $order->update([
            'status' => 'CANCELLED',
            'cancellation_reason' => $request->input('reason'),
            'cancelled_by' => $user->role,
            'cancelled_at' => now(),
        ]);

        // Notify the other party
        $notifyUserId = $user->isCustomer() ? $order->technician?->user_id : $order->customer_id;
        if ($notifyUserId) {
            Notification::create([
                'user_id' => $notifyUserId,
                'title' => 'Order Dibatalkan',
                'body' => "Order telah dibatalkan",
                'type' => 'ORDER_UPDATE',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully',
            'data' => new OrderResource($order->fresh()),
        ]);
    }

    public function history(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Order::query();

        if ($user->isCustomer()) {
            $query->where('customer_id', $user->id);
        }

        $query->whereIn('status', ['COMPLETED', 'CANCELLED']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->with(['customer', 'technician', 'photos', 'payment', 'review'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => [
                'items' => OrderResource::collection($orders->items()),
                'meta' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    public function invoice(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::with(['customer', 'technician', 'photos', 'payment', 'review'])
            ->findOrFail($id);

        if ($order->customer_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Generate invoice data
        $invoiceData = [
            'order_id' => $order->id,
            'invoice_number' => 'INV-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
            'date' => $order->created_at->format('Y-m-d'),
            'customer' => [
                'name' => $order->customer->name,
                'email' => $order->customer->email,
                'phone' => $order->customer->phone,
            ],
            'technician' => $order->technician ? [
                'shop_name' => $order->technician->shop_name,
                'address' => $order->technician->address,
            ] : null,
            'service' => [
                'category' => $order->category,
                'device_model' => $order->device_model,
                'problem_description' => $order->problem_description,
                'service_type' => $order->service_type,
            ],
            'payment' => $order->payment ? [
                'amount' => $order->payment->amount,
                'method' => $order->payment->method,
                'status' => $order->payment->status,
                'paid_at' => $order->payment->paid_at?->format('Y-m-d H:i:s'),
            ] : null,
            'total' => $order->agreed_price ?? 0,
        ];

        return response()->json([
            'success' => true,
            'data' => $invoiceData,
        ]);
    }
}
