<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DamLog extends Model
{
    protected $fillable = [
        'dam_id',
        'water_level',
        'water_height',
        'door_status',
        'threshold'
    ];
}
