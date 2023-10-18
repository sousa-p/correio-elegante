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
        Schema::create('Letters', function (Blueprint $table) {
            $table->id('id');
            $table->string('name_sender')->nullable();
            $table->string('name_receiver');
            $table->string('class_sender');
            $table->string('class_receiver');
            $table->enum('type', []);
            $table->string('message')->max('255');
            $table->boolean('sent')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'Letters');
    }
};
