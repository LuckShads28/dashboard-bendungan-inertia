<?php

namespace App\Listeners;

use App\Events\DoorControlEvent;
use App\Models\Dam;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class DoorControlListener
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
    public function handle(DoorControlEvent $event): void
    {
        $dam = Dam::firstWhere("mac_address", $event->macAddress);

        if ($dam) {
            $dam->update([
                'door_status' => $event->doorState
            ]);
        }
    }
}
