<?php

namespace App\Http\Controllers;

use App\Events\DoorControlEvent;
use App\Models\Dam;
use App\Models\DamLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dams = Dam::all();

        return inertia('Dashboard/Dam/DamPage', [
            'dams' => $dams
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dam = Dam::firstWhere('id', $id);

        if (!$dam) {
            return response()->json([
                'message' => 'Dam data not found'
            ], 404);
        }

        $damHistory = DamLog::where('dam_id', $id)
            ->latest()
            ->take(10)
            ->get(['water_height', 'water_level', 'threshold', 'door_status', 'created_at'])
            ->map(function ($log) {
                return [
                    'water_height' => $log->water_height,
                    'water_level' => $log->water_level,
                    'created_at' => Carbon::parse($log->created_at)->format('H:i:s'), // Format time as "HH:mm"
                ];
            });

        return inertia('Dashboard/Dam/DamDetails', [
            'dam' => $dam,
            'dam_history' => $damHistory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Untuk control pintu
     */
    public function doorControl(Request $request)
    {
        $request->validate([
            'mac_address' => 'required',
            'door_state' => 'required|in:open,close'
        ]);

        broadcast(new DoorControlEvent($request->mac_address, $request->door_state))->toOthers();

        return redirect()->back();
    }
}
