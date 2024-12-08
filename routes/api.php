<?php

use App\Http\Controllers\Api\DamControllerApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'message' => 'okkkk'
    ]);
});
Route::post('/dam/connect', [DamControllerApi::class, 'connect']);
Route::put('/dam/update', [DamControllerApi::class, 'update']);
