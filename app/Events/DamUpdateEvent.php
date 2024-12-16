<?php

namespace App\Events;

use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DamUpdateEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $waterHeight, $waterLevel, $macAddress, $threshold, $doorStatus;

    /**
     * Create a new event instance.
     */
    public function __construct($macAddress, $waterHeight, $waterLevel, $threshold, $door_status)
    {
        $this->waterLevel = $waterLevel;
        $this->waterHeight = $waterHeight;
        $this->macAddress = $macAddress;
        $this->threshold = $threshold;
        $this->doorStatus = $door_status;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('dam-update'),
        ];
    }

    public function broadcastAs()
    {
        return 'dam-log';
    }

    public function broadcastWith()
    {
        return [
            "water_level" => $this->waterLevel,
            "water_height" => $this->waterHeight,
            "threshold" => $this->threshold,
            "door_status" => $this->doorStatus,
            "created_at" => Carbon::parse(now())->format('H:i:s')
        ];
    }
}
