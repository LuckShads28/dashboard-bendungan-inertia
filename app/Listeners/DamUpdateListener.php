<?php

namespace App\Listeners;

use App\Events\DamUpdateEvent;
use App\Models\Dam;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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

        if ($dam) {
            $dam->update([
                'water_level' => $event->waterLevel,
                'water_height' => $event->waterHeight
            ]);
        }
    }
}
