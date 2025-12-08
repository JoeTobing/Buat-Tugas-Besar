<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\RegisterTechnicianRequest;
use App\Http\Resources\UserResource;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            \Log::info('Register attempt', ['email' => $request->email]);
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => 'CUSTOMER',
            ]);

            \Log::info('User created', ['user_id' => $user->id, 'email' => $user->email]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registration successful',
                'data' => [
                    'user' => new UserResource($user),
                    'token' => $token,
                ],
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage(),
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function registerTechnician(RegisterTechnicianRequest $request): JsonResponse
    {
        try {
            \Log::info('Register technician attempt', ['email' => $request->email]);
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => 'TECHNICIAN',
            ]);

            \Log::info('User created', ['user_id' => $user->id]);

            // Handle file uploads
            $ktpPath = null;
            $certificatePath = null;

            if ($request->hasFile('ktp')) {
                $ktpPath = $request->file('ktp')->store('technicians/ktp', 'public');
                $ktpPath = '/storage/' . $ktpPath;
            }

            if ($request->hasFile('certificate')) {
                $certificatePath = $request->file('certificate')->store('technicians/certificates', 'public');
                $certificatePath = '/storage/' . $certificatePath;
            }

            $technician = Technician::create([
                'user_id' => $user->id,
                'shop_name' => $request->shop_name,
                'address' => $request->address,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'category' => $request->category,
                'description' => $request->description,
                'base_price' => $request->base_price,
                'ktp_url' => $ktpPath,
                'certificate_url' => $certificatePath,
                'verified' => true,
                'status' => 'ON_DUTY',
            ]);

            \Log::info('Technician created', ['technician_id' => $technician->id]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registration successful',
                'data' => [
                    'user' => new UserResource($user->load('technician')),
                    'token' => $token,
                ],
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration technician error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage(),
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => new UserResource($user->load('technician')),
                'token' => $token,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('technician');

        return response()->json([
            'success' => true,
            'data' => new UserResource($user),
        ]);
    }
}
