<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NegotiationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminController;

// Authentication Routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/register-technician', [AuthController::class, 'registerTechnician']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public Routes - Technicians
Route::get('/technicians', [TechnicianController::class, 'index']);
Route::get('/technicians/{id}', [TechnicianController::class, 'show']);
Route::get('/technicians/{id}/services', [TechnicianController::class, 'getServices']);
Route::get('/technicians/{id}/reviews', [TechnicianController::class, 'getReviews']);
Route::get('/technicians/{id}/rating', [TechnicianController::class, 'getRating']);

// Protected Routes (requires authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{id}/reject', [OrderController::class, 'reject']);
    Route::post('/orders/{id}/start', [OrderController::class, 'start']);
    Route::post('/orders/{id}/complete', [OrderController::class, 'complete']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::get('/me/orders/history', [OrderController::class, 'history']);
    Route::get('/me/orders/{id}/invoice', [OrderController::class, 'invoice']);
    
    // Chat
    Route::get('/orders/{id}/chats', [ChatController::class, 'index']);
    Route::post('/orders/{id}/chats', [ChatController::class, 'store']);
    
    // Negotiation
    Route::get('/orders/{id}/negotiations', [NegotiationController::class, 'index']);
    Route::post('/orders/{id}/negotiations', [NegotiationController::class, 'store']);
    Route::post('/orders/{id}/negotiations/{negotiationId}/accept', [NegotiationController::class, 'accept']);
    Route::post('/orders/{id}/negotiations/{negotiationId}/reject', [NegotiationController::class, 'reject']);
    
    // Payment
    Route::get('/orders/{id}/payment', [PaymentController::class, 'show']);
    Route::post('/orders/{id}/payment', [PaymentController::class, 'store']);
    Route::put('/orders/{id}/payment', [PaymentController::class, 'update']);
    
    // Review
    Route::post('/orders/{id}/review', [ReviewController::class, 'store']);
    
    // Notification
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    
    // Technician Profile Routes
    Route::put('/technician/profile', [TechnicianController::class, 'updateProfile']);
    Route::put('/technician/status', [TechnicianController::class, 'updateStatus']);
    
    // Admin Routes
    Route::get('/admin/technicians', [AdminController::class, 'getTechnicians']);
    Route::post('/admin/technicians/{id}/verify', [AdminController::class, 'verifyTechnician']);
    Route::put('/admin/users/{id}/status', [AdminController::class, 'updateUserStatus']);
    Route::get('/admin/orders', [AdminController::class, 'getOrders']);
});