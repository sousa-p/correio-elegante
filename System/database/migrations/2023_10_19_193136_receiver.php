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
        Schema::create('Receivers', function (Blueprint $table) {
            $table->id('id');
            $table->string('name')->max('255');
            $table->string('course')->max('50');
            $table->year('year');
            $table->string('characteristics');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Receivers');
    }
};
