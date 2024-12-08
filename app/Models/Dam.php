<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dam extends Model
{
    protected $fillable = [
        'name',
        'water_level'
    ];

    protected static function booted()
    {
        static::updating(function ($dam) {
            if ($dam->isDirty('water_level')) {
            }
        });
    }
}
