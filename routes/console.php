<?php

use App\Models\Dam;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Ubah status alat ke off
Schedule::call(function () {
    Dam::where('status', 'on')->update(['status' => 'off']);
})->everyMinute();
