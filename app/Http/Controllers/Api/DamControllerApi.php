<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dam;
use Illuminate\Http\Request;

class DamControllerApi extends Controller
{
    // Used for connecting or heartbeat
    public function connect(Request $request)
    {
        $damUUID = $request->dam_uuid;
        $name = $request->name;
        $secretKey = $request->key;

        if ($secretKey !== env('API_SECRET_KEY')) {
            return response()->json(['message' => 'unauthorized'], 401);
        }
        Dam::updateOrCreate([
            'dam_uuid' => $damUUID,
            'name' => $name
        ]);

        return response()->json(['message' => 'success']);
    }

    // Used for updating sensor data
    public function update(Request $request)
    {
        $damUUID = $request->dam_uuid;
        $water_level = $request->water_level;

        $dam = Dam::firstWhere('dam_uuid', $damUUID);
        $dam->water_level = $water_level;
        $dam->update();

        return response()->json(['message' => 'success']);
    }
}
