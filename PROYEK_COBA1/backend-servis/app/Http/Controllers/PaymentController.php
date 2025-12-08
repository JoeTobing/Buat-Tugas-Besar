<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function show(Request $request, int $id): JsonResponse
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

        $payment = $order->payment;

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new PaymentResource($payment),
        ]);
    }

    public function store(CreatePaymentRequest $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        // Check authorization - technician or admin can create payment
        if (!$user->isTechnician() && !$user->isAdmin()) {
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

        // Check if payment already exists
        if ($order->payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment already exists for this order',
            ], 400);
        }

        $payment = Payment::create([
            'order_id' => $id,
            'amount' => $request->amount,
            'method' => $request->method,
            'status' => $request->status,
            'transaction_ref' => $request->transaction_ref,
            'paid_at' => $request->status === 'PAID' ? now() : null,
        ]);

        // Create notification for customer
        Notification::create([
            'user_id' => $order->customer_id,
            'title' => 'Pembayaran',
            'body' => "Pembayaran untuk order Anda telah dicatat",
            'type' => 'PAYMENT',
            'related_id' => (string) $order->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'data' => new PaymentResource($payment),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $payment = Payment::findOrFail($id);

        // Check authorization
        if (!$user->isTechnician() && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'amount' => 'sometimes|numeric|min:0',
            'method' => 'sometimes|in:CASH,TRANSFER,EWALLET,OTHER',
            'status' => 'sometimes|in:UNPAID,PAID,FAILED,REFUNDED',
            'transaction_ref' => 'sometimes|nullable|string|max:255',
        ]);

        if (isset($validated['status']) && $validated['status'] === 'PAID' && !$payment->paid_at) {
            $validated['paid_at'] = now();
        }

        $payment->update($validated);

        // Create notification if status changed to PAID
        if (isset($validated['status']) && $validated['status'] === 'PAID') {
            $order = $payment->order;
            Notification::create([
                'user_id' => $order->customer_id,
                'title' => 'Pembayaran Dikonfirmasi',
                'body' => "Pembayaran Anda telah dikonfirmasi",
                'type' => 'PAYMENT',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment updated successfully',
            'data' => new PaymentResource($payment->fresh()),
        ]);
    }
}

