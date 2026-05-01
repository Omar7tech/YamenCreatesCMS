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
        Schema::table('tasks', function (Blueprint $table) {
            $table->string('priority')->default('medium')->after('status');
            $table->json('tags')->nullable()->after('priority');
            $table->string('assignee')->nullable()->after('tags');
            $table->integer('progress')->default(0)->after('assignee');
            $table->integer('estimated_hours')->nullable()->after('progress');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn(['priority', 'tags', 'assignee', 'progress', 'estimated_hours']);
        });
    }
};
