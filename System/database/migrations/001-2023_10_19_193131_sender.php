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
        Schema::create('Senders', function (Blueprint $table) {
            $table->id('id');
            $table->string('name')->max('255');
            $table->string('course')->max('50')->nullable();
            $table->enum('year', ['1', '2', '3'])->nullable();
            $table->string('tel')->max('15');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'Senders');
    }
};
