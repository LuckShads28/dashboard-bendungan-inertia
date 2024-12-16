<?php

use App\Http\Controllers\Api\DamControllerApi;
use Illuminate\Support\Facades\Route;

Route::middleware('validate.api')->group(function () {
    Route::post('/dam/connect', [DamControllerApi::class, 'connect']);
    Route::put('/dam/update', [DamControllerApi::class, 'update']);

    Route::get('/dam/door-status/{mac_address}', [DamControllerApi::class, 'getDoorState']);

    Route::get('/ping', [DamControllerApi::class, 'ping']);
});
