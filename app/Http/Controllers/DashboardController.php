<?php

namespace App\Http\Controllers;

use App\Models\Dam;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $damInfo = [
            'damTotal' => Dam::count(),
            'damActive' => Dam::where('status', 'on')->count()
        ];

        return inertia('Dashboard/DashboardPage', [
            'damInfo' => $damInfo
        ]);
    }
}
