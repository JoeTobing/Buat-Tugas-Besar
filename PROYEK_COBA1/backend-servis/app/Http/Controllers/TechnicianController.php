<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Http\Resources\TechnicianResource;
use App\Models\Technician;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TechnicianController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Technician::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by location (radius)
        if ($request->has('lat') && $request->has('lng') && $request->has('radius')) {
            $lat = $request->lat;
            $lng = $request->lng;
            $radius = $request->radius; // in km

            $query->selectRaw(
                'technicians.*, 
                (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                [$lat, $lng, $lat]
            )
            ->having('distance', '<=', $radius)
            ->orderBy('distance');
        } else {
            // Sort options
            $sort = $request->get('sort', 'rating');
            switch ($sort) {
                case 'nearest':
                    if ($request->has('lat') && $request->has('lng')) {
                        $lat = $request->lat;
                        $lng = $request->lng;
                        $query->selectRaw(
                            'technicians.*, 
                            (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                            [$lat, $lng, $lat]
                        )->orderBy('distance');
                    } else {
                        $query->orderBy('rating', 'desc');
                    }
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'price':
                    $query->orderBy('base_price', 'asc');
                    break;
                default:
                    $query->orderBy('rating', 'desc');
            }
        }

        $technicians = $query->with('user')->paginate(15);

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

    public function show(int $id): JsonResponse
    {
        $technician = Technician::with(['user', 'services'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new TechnicianResource($technician),
        ]);
    }

    public function getServices(int $id): JsonResponse
    {
        $technician = Technician::findOrFail($id);
        $services = $technician->services;

        return response()->json([
            'success' => true,
            'data' => ServiceResource::collection($services),
        ]);
    }

    public function getReviews(int $id): JsonResponse
    {
        $technician = Technician::findOrFail($id);
        $reviews = $technician->reviews()->with('customer')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $reviews->items(),
                'meta' => [
                    'current_page' => $reviews->currentPage(),
                    'last_page' => $reviews->lastPage(),
                    'per_page' => $reviews->perPage(),
                    'total' => $reviews->total(),
                ],
            ],
        ]);
    }

    public function getRating(int $id): JsonResponse
    {
        $technician = Technician::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'rating' => $technician->rating ?? 0,
                'review_count' => $technician->reviews()->count(),
            ],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $technician = $user->technician;

        if (!$technician) {
            return response()->json([
                'success' => false,
                'message' => 'Technician profile not found',
            ], 404);
        }

        $validated = $request->validate([
            'shop_name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'category' => 'sometimes|in:COMPUTER,SMARTPHONE,HOME_APPLIANCE,OTHER',
            'description' => 'sometimes|nullable|string',
            'base_price' => 'sometimes|nullable|numeric|min:0',
            'latitude' => 'sometimes|nullable|numeric',
            'longitude' => 'sometimes|nullable|numeric',
            'open_time' => 'sometimes|nullable|date_format:H:i',
            'close_time' => 'sometimes|nullable|date_format:H:i',
        ]);

        $technician->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Technician profile updated successfully',
            'data' => new TechnicianResource($technician->fresh()->load('user')),
        ]);
    }

    public function updateStatus(Request $request): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:AVAILABLE,ON_DUTY,OFFLINE',
        ]);

        $user = $request->user();
        $technician = $user->technician;

        if (!$technician) {
            return response()->json([
                'success' => false,
                'message' => 'Technician profile not found',
            ], 404);
        }

        $technician->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => new TechnicianResource($technician->fresh()),
        ]);
    }
}
