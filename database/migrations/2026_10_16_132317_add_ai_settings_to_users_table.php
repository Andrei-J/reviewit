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
        Schema::table('users', function (Blueprint $table) {
            $table->string('ai_provider')->default('local')->after('plan'); // 'local' or 'cloud'
            $table->string('ai_model')->nullable()->after('ai_provider');   // e.g. 'llama3', 'mistral'
            $table->text('cloud_ai_api_key')->nullable()->after('ai_model');
            $table->string('cloud_ai_base_url')->nullable()->after('cloud_ai_api_key');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['ai_provider', 'ai_model', 'cloud_ai_api_key', 'cloud_ai_base_url']);
        });
    }
};
