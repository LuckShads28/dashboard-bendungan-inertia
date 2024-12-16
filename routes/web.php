<?php

use App\Events\ChatEvent;
use App\Events\DeviceConnected;
use App\Events\DoorControlEvent;
use App\Events\PicoConnection;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DamController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MasterUserController;
use App\Models\Dam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::resource('user', MasterUserController::class)->names('master-user');
    Route::resource('dam', DamController::class);

    Route::put('door-control', [DamController::class, 'doorControl'])->name('door.control');
});

Route::post("/send-message", function (Request $request) {
    // Broadcast the message to the lobby-chat channel
    broadcast(new ChatEvent($request->message))->toOthers();

    return response()->json(['status' => 'Message sent!']);
});

Route::get('/door/{state}', function ($state) {
    broadcast(new DoorControlEvent('aa:bb:cc:dd:ee:ff', $state))->toOthers();

    return "ok";
});

Route::get('/chat', function () {
    return inertia('ChatRoom');
});

Route::get('/', function () {
    return redirect()->route('dashboard.index');
});
