<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $order = Order::findOrFail($id);

        // Check authorization - only customer can review
        if ($order->customer_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Check if order is completed and paid
        if ($order->status !== 'COMPLETED') {
            return response()->json([
                'success' => false,
                'message' => 'Order must be completed before review',
            ], 400);
        }

        if (!$order->payment || $order->payment->status !== 'PAID') {
            return response()->json([
                'success' => false,
                'message' => 'Payment must be completed before review',
            ], 400);
        }

        // Check if review already exists
        if ($order->review) {
            return response()->json([
                'success' => false,
                'message' => 'Review already exists for this order',
            ], 400);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review = Review::create([
            'order_id' => $id,
            'customer_id' => $user->id,
            'technician_id' => $order->technician_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Update technician rating
        $technician = $order->technician;
        if ($technician) {
            $reviews = Review::where('technician_id', $technician->id)->get();
            $avgRating = $reviews->avg('rating');
            $technician->update([
                'rating' => round($avgRating, 2),
                'review_count' => $reviews->count(),
            ]);
        }

        // Create notification for technician
        if ($technician && $technician->user) {
            Notification::create([
                'user_id' => $technician->user->id,
                'title' => 'Review Baru',
                'body' => "Anda mendapat review baru dengan rating {$request->rating} bintang",
                'type' => 'REVIEW',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Review created successfully',
            'data' => new ReviewResource($review->load('customer')),
        ], 201);
    }
}

