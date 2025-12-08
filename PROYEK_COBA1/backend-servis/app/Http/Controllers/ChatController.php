<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
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

        $chats = Chat::where('order_id', $id)
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => [
                'items' => ChatResource::collection($chats->items()),
                'meta' => [
                    'current_page' => $chats->currentPage(),
                    'last_page' => $chats->lastPage(),
                    'per_page' => $chats->perPage(),
                    'total' => $chats->total(),
                ],
            ],
        ]);
    }

    public function store(Request $request, int $id): JsonResponse
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

        $request->validate([
            'message' => 'required|string|max:1000',
            'attachment' => 'nullable|string',
        ]);

        $chat = Chat::create([
            'order_id' => $id,
            'sender_id' => $user->id,
            'message' => $request->message,
            'attachment_url' => $request->attachment,
        ]);

        // Create notification for the other party
        $notifyUserId = $user->isCustomer() ? $order->technician?->user_id : $order->customer_id;
        if ($notifyUserId) {
            Notification::create([
                'user_id' => $notifyUserId,
                'title' => 'Pesan Baru',
                'body' => "Anda mendapat pesan baru di order #{$order->id}",
                'type' => 'ORDER_UPDATE',
                'related_id' => (string) $order->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => new ChatResource($chat->load('sender')),
        ], 201);
    }
}

