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
            $table->string('plan')->default('free')->after('email');
            $table->timestamp('banned_at')->nullable()->after('plan');
            $table->string('ban_reason')->nullable()->after('banned_at');
            $table->foreignId('banned_by_id')->nullable()->after('ban_reason')->constrained('users')->nullOnDelete();
            $table->softDeletes()->after('updated_at');

            $table->index('plan');
            $table->index('banned_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['banned_by_id']);
            $table->dropIndex(['plan']);
            $table->dropIndex(['banned_at']);
            $table->dropColumn(['plan', 'banned_at', 'ban_reason', 'banned_by_id']);
            $table->dropSoftDeletes();
        });
    }
};
