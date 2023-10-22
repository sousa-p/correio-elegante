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
            $table->enum('status', ['Aguardando Pagamento', 'Pendente de Envio', 'Enviado'])->default('Aguardando Pagamento');
            $table->string('message')->max('255');
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('sender_id');
            $table->index('Senders');
            $table->index('Receivers');
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
