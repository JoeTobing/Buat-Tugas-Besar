<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('technicians', function (Blueprint $table) {
            $table->string('ktp_url')->nullable()->after('close_time');
            $table->string('certificate_url')->nullable()->after('ktp_url');
        });
    }

    public function down(): void
    {
        Schema::table('technicians', function (Blueprint $table) {
            $table->dropColumn(['ktp_url', 'certificate_url']);
        });
    }
};




