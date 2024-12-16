<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DoorControlEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $macAddress, $doorState;

    /**
     * Create a new event instance.
     */
    public function __construct($macAddress, $doorState)
    {
        $this->macAddress = $macAddress;
        $this->doorState = $doorState;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('door-control'),
        ];
    }

    public function broadcastAs()
    {
        return "door-control";
    }

    public function broadcastWith()
    {
        return [
            "mac_address" => $this->macAddress,
            "door_state" =>  $this->doorState
        ];
    }
}
