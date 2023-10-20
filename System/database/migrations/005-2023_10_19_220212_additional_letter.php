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
        Schema::create('additional_letter', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('additional_id');
            $table->unsignedBigInteger('letter_id');
            $table->timestamps();
            $table->index('Additionals');
            $table->index('Letters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'additional_letter');
    }
};
