<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Dam extends Model
{
    protected $fillable = [
        'mac_address',
        'name',
        'address',
        'status',
        'door_status',
        'water_level',
        'water_height',
        'threshold',
    ];

    protected static function booted()
    {
        static::saved(function (Dam $dam) {
            // Flag agar tidak infinite loop
            static $isUpdating = false;

            // Jika isUpdating true maka hentikan
            if ($isUpdating) {
                return;
            }

            // Atur isUpdating jadi true
            $isUpdating = true;

            // Cek jika yang diupdate bukan dari value yang dilist, maka update log dan status
            if (!$dam->isDirty(['name', 'address', 'threshold', 'status'])) {
                // Update status
                $dam->update(['status' => 'on']);

                // Tambah log data bendungan
                DamLog::create([
                    'dam_id' => $dam->id,
                    'water_level' => $dam->water_level,
                    'water_height' => $dam->water_height,
                    'door_status' => $dam->door_status,
                    'threshold' => $dam->threshold
                ]);
            }

            // Reset flag
            $isUpdating = false;
        });
    }

    public function getStatusAttribute($value)
    {
        return ucwords($value);
    }
}
