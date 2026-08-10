<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('table_id')->constrained('restaurant_tables')->restrictOnDelete();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->integer('guests');
            $table->date('reservation_date');
            $table->time('reservation_time');
            $table->decimal('reservation_fee', 8, 2)->default(0);
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->enum('reservation_status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->string('stripe_payment_id')->nullable();
            $table->text('special_request')->nullable();
            $table->timestamps();
            
            // Prevent double booking at the database level where possible, although application logic is main defense.
            $table->unique(['table_id', 'reservation_date', 'reservation_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
