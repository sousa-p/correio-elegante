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
        Schema::create('candy_letter', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candy_id');
            $table->unsignedBigInteger('letter_id');
            $table->timestamps();
            $table->index('Candies');
            $table->index('Letters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'candy_letter');
    }
};
