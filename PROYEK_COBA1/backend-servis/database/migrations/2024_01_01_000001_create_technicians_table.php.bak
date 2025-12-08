<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technicians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('shop_name');
            $table->text('address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->enum('category', ['COMPUTER', 'SMARTPHONE', 'HOME_APPLIANCE', 'OTHER'])->default('OTHER');
            $table->text('description')->nullable();
            $table->decimal('base_price', 10, 2)->nullable();
            $table->enum('status', ['AVAILABLE', 'ON_DUTY', 'OFFLINE'])->default('OFFLINE');
            $table->boolean('verified')->default(false);
            $table->time('open_time')->nullable();
            $table->time('close_time')->nullable();
            $table->decimal('rating', 3, 2)->default(0)->comment('Average rating');
            $table->integer('review_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technicians');
    }
};
