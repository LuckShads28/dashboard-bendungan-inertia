<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DamController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MasterUserController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::resource('user', MasterUserController::class)->names('master-user');
    Route::resource('dam', DamController::class);
});

Route::get('/', function () {
    return redirect()->route('dashboard.index');
});
