<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dams', function (Blueprint $table) {
            $table->id();
            $table->string('mac_address');
            $table->string('name');
            $table->text('address')->nullable();
            $table->enum('status', ['on', 'off'])->default('off');
            $table->enum('door_status', ['open', 'close'])->default('close');
            $table->float('water_level')->default(0);
            $table->float('water_height')->default(0);
            $table->float('threshold')->default(100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dams');
    }
};
