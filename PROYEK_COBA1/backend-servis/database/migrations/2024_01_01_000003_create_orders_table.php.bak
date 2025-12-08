<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('technician_id')->nullable()->constrained('technicians')->onDelete('set null');
            $table->enum('category', ['COMPUTER', 'SMARTPHONE', 'HOME_APPLIANCE', 'OTHER']);
            $table->string('device_model')->nullable();
            $table->text('problem_description');
            $table->enum('service_type', ['AT_SHOP', 'HOME_SERVICE']);
            $table->text('address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->enum('status', [
                'PENDING',
                'IN_NEGOTIATION',
                'ACCEPTED',
                'ON_PROGRESS',
                'COMPLETED',
                'REJECTED',
                'CANCELLED'
            ])->default('PENDING');
            $table->decimal('agreed_price', 10, 2)->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->string('cancelled_by')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

