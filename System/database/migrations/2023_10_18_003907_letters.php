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
            $table->string('name_sender')->nullable()->max(150);
            $table->string('course_sender')->max(10)->nullable();
            $table->enum('year_sender', ['1', '2', '3'])->nullable();
            $table->string('name_receiver')->max(150);
            $table->string('course_receiver')->max(10)->nullable();
            $table->enum('year_receiver', ['1','2','3'])->nullable();
            $table->string('characteristics_receiver')->max(255)->nullable();
            $table->enum('type', ['normal', 'especial'])->default('normal');
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
