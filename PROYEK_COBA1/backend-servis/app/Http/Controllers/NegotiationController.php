<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNegotiationRequest;
use App\Http\Resources\NegotiationResource;
use App\Models\Negotiation;
use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NegotiationController extends Controller
{
    public function index(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

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

        $negotiations = Negotiation::where('order_id', $id)
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => NegotiationResource::collection($negotiations),
        ]);
    }

    public function store(CreateNegotiationRequest $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

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

        $negotiation = Negotiation::create([
            'order_id' => $id,
            'sender_id' => $user->id,
            'offered_price' => $request->offered_price,
            'message' => $request->message,
            'status' => 'PENDING',
        ]);

        // Create notification
        $notifyUserId = $user->isCustomer() ? $order->technician?->user_id : $order->customer_id;
        if ($notifyUserId) {
            Notification::create([
                'user_id' => $notifyUserId,
                'title' => 'Penawaran Harga Baru',
                'body' => "Anda mendapat penawaran harga baru: Rp " . number_format($request->offered_price, 0, ',', '.'),
                'type' => 'ORDER_UPDATE',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Negotiation created successfully',
            'data' => new NegotiationResource($negotiation->load('sender')),
        ], 201);
    }

    public function accept(Request $request, int $id, int $negotiationId): JsonResponse
    {
        $user = $request->user()->load('technician');
        $order = Order::with('technician')->findOrFail($id);
        $negotiation = Negotiation::with('sender')->findOrFail($negotiationId);

        $sender = $negotiation->sender;
        $canAccept = false;

        // Jika pengirim CUSTOMER, yang boleh accept adalah teknisi yang memegang order
        if ($sender->isCustomer() && $sender->id === $order->customer_id) {
            if ($user->isTechnician() && $user->technician && $order->technician_id === $user->technician->id) {
                $canAccept = true;
            }
        }
        // Jika pengirim TECHNICIAN, yang boleh accept adalah customer pemilik order
        elseif ($sender->isTechnician()) {
            if ($user->isCustomer() && $order->customer_id === $user->id) {
                $canAccept = true;
            }
        }
        // Admin boleh
        elseif ($user->isAdmin()) {
            $canAccept = true;
        }

        if (!$canAccept) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Hanya penerima penawaran yang boleh menerima.',
            ], 403);
        }

        $negotiation->update(['status' => 'ACCEPTED']);

        // Harga disepakati, status order naik ke ACCEPTED
        $order->update([
            'agreed_price' => $negotiation->offered_price,
            'status' => 'ACCEPTED',
        ]);

        // Reject penawaran lain yang masih pending
        Negotiation::where('order_id', $id)
            ->where('id', '!=', $negotiationId)
            ->where('status', 'PENDING')
            ->update(['status' => 'REJECTED']);

        // Notifikasi ke pengirim penawaran
        $notifyUserId = $negotiation->sender_id;
        if ($notifyUserId) {
            Notification::create([
                'user_id' => $notifyUserId,
                'title' => 'Penawaran Diterima',
                'body' => "Penawaran harga Anda diterima. Harga: Rp " . number_format($negotiation->offered_price, 0, ',', '.'),
                'type' => 'ORDER_UPDATE',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Penawaran diterima. Harga disepakati.',
            'data' => new NegotiationResource($negotiation->fresh()->load('sender')),
        ]);
    }

    
    public function reject(Request $request, int $id, int $negotiationId): JsonResponse
    {
        $user = $request->user()->load('technician');
        $order = Order::with('technician')->findOrFail($id);
        $negotiation = Negotiation::with('sender')->findOrFail($negotiationId);

        $sender = $negotiation->sender;
        $canReject = false;

        // Jika pengirim CUSTOMER, yang boleh reject adalah teknisi pemegang order
        if ($sender->isCustomer() && $sender->id === $order->customer_id) {
            if ($user->isTechnician() && $user->technician && $order->technician_id === $user->technician->id) {
                $canReject = true;
            }
        }
        // Jika pengirim TECHNICIAN, yang boleh reject adalah customer pemilik order
        elseif ($sender->isTechnician()) {
            if ($user->isCustomer() && $order->customer_id === $user->id) {
                $canReject = true;
            }
        }
        // Admin boleh
        elseif ($user->isAdmin()) {
            $canReject = true;
        }

        if (!$canReject) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Hanya penerima penawaran yang boleh menolak.',
            ], 403);
        }

        $negotiation->update(['status' => 'REJECTED']);

        // Notifikasi ke pengirim penawaran
        $notifyUserId = $negotiation->sender_id;
        if ($notifyUserId) {
            Notification::create([
                'user_id' => $notifyUserId,
                'title' => 'Penawaran Ditolak',
                'body' => "Penawaran harga Anda ditolak",
                'type' => 'ORDER_UPDATE',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Penawaran ditolak',
            'data' => new NegotiationResource($negotiation->fresh()),
        ]);
    }
}