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
        Schema::create('dam_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dam_id')->constrained('dams');
            $table->float('water_level')->default(0);
            $table->float('water_height')->default(0);
            $table->integer('threshold')->default(0);
            $table->enum('door_status', ['open', 'close'])->default('close');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dam_logs');
    }
};
