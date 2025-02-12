<?php

namespace App\Listeners;

use App\Events\DamUpdateEvent;
use App\Models\Dam;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class DamUpdateListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DamUpdateEvent $event): void
    {
        $dam = Dam::firstWhere('mac_address', $event->macAddress);

        Log::debug($event->waterHeight);
        Log::debug($dam->threshold);
        Log::debug($event->waterHeight < $dam->threshold);
        if ($dam) {
            if ($event->waterHeight > $dam->threshold) {
                Log::debug("door open");
                $dam->update([
                    'water_level' => $event->waterLevel,
                    'water_height' => $event->waterHeight,
                    'door_status' => 'open'
                ]);
            } else {
                Log::debug("door close");
                $dam->update([
                    'water_level' => $event->waterLevel,
                    'water_height' => $event->waterHeight,
                    'door_status' => 'close'
                ]);
            }
            // if ($event->waterLevel > $dam->threshold) {
            //     $dam->update([
            //         'water_level' => $event->waterLevel,
            //         'water_height' => $event->waterHeight,
            //         'door_state' => 'open'
            //     ]);
            // } else {
            //     $dam->update([
            //         'water_level' => $event->waterLevel,
            //         'water_height' => $event->waterHeight,
            //         'door_state' => 'close'
            //     ]);
            // }
        }
    }
}
