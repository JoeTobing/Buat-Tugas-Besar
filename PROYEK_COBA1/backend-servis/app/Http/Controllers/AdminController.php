<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Resources\TechnicianResource;
use App\Http\Resources\UserResource;
use App\Models\Order;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getTechnicians(Request $request): JsonResponse
    {
        $query = Technician::query()->with('user');

        if ($request->has('verified')) {
            $query->where('verified', $request->boolean('verified'));
        }

        $technicians = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => [
                'items' => TechnicianResource::collection($technicians->items()),
                'meta' => [
                    'current_page' => $technicians->currentPage(),
                    'last_page' => $technicians->lastPage(),
                    'per_page' => $technicians->perPage(),
                    'total' => $technicians->total(),
                ],
            ],
        ]);
    }

    public function verifyTechnician(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'verified' => 'required|boolean',
        ]);

        $technician = Technician::findOrFail($id);
        $technician->update(['verified' => $request->verified]);

        return response()->json([
            'success' => true,
            'message' => $request->verified ? 'Technician verified successfully' : 'Technician verification removed',
            'data' => new TechnicianResource($technician->fresh()->load('user')),
        ]);
    }

    public function updateUserStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $user = User::findOrFail($id);
        $user->update(['is_active' => $request->is_active]);

        return response()->json([
            'success' => true,
            'message' => $request->is_active ? 'User activated successfully' : 'User deactivated successfully',
            'data' => new UserResource($user->fresh()),
        ]);
    }

    public function getOrders(Request $request): JsonResponse
    {
        $query = Order::query()->with(['customer', 'technician', 'payment']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(15);

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
}

