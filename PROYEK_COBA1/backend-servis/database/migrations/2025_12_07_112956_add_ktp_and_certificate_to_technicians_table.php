<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('technicians', function (Blueprint $table) {
            if (!Schema::hasColumn('technicians', 'ktp_url')) {
                $table->string('ktp_url')->nullable();
            }

            if (!Schema::hasColumn('technicians', 'certificate_url')) {
                $table->string('certificate_url')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('technicians', function (Blueprint $table) {
            $table->dropColumn(['ktp_url', 'certificate_url']);
        });
    }
};
