<?php

namespace App\Http\Controllers\Api;

use App\Events\DamUpdateEvent;
use App\Http\Controllers\Controller;
use App\Models\Dam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DamControllerApi extends Controller
{
    // Used for connecting or heartbeat
    public function connect(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'mac_address' => 'required|unique:dams,mac_address'
        ]);

        $dam = Dam::firstOrCreate(
            ['mac_address' => $request->mac_address],
            [
                'name' => $request->name,
                'mac_address' => $request->mac_address,
            ]
        );

        if ($dam) {
            $dam->update(['status' => 'on']);
        }

        return response()->json(['message' => 'success']);
    }

    // Used for updating sensor data
    public function update(Request $request)
    {
        $request->validate([
            'mac_address' => 'required',
            'water_level' => 'required|numeric',
            'water_height' => 'required|numeric'
        ]);

        $macAddress = $request->mac_address;
        $waterLevel = $request->water_level;
        $waterHeight = $request->water_height;

        $dam = Dam::firstWhere('mac_address', $macAddress);

        broadcast(new DamUpdateEvent($macAddress, $waterHeight, $waterLevel, $dam->threshold, $dam->door_status))->toOthers();

        return response()->json(['message' => 'updated']);
    }

    public function getDoorState($macAddress)
    {
        $dam = Dam::select('door_status')->firstWhere('mac_address', $macAddress);
        if (!$dam) {
            return response()->json([
                'message' => 'Dam not found'
            ], 404);
        }

        return response()->json($dam);
    }

    public function ping()
    {
        return response()->json('pong');
    }
}
