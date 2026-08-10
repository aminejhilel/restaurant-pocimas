<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/menu', [MenuController::class, 'index']);
Route::get('/menu/categories', [MenuController::class, 'categories']);
Route::get('/tables', [TableController::class, 'index']);
Route::get('/tables/availability', [TableController::class, 'availability']);

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Contact
Route::post('/contact', [ContactController::class, 'store']);

// Stripe Webhook (no auth - verified by signature)
Route::post('/stripe/webhook', [PaymentController::class, 'webhook']);

// Reservations (public - guests can also book)
Route::post('/reservations', [ReservationController::class, 'store']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/reservations/my', [ReservationController::class, 'myReservations']);
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
    Route::put('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);

    Route::post('/payment/create', [PaymentController::class, 'createCheckoutSession']);
});
