<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        // Create one task per column
        Task::factory()->create([
            'title' => 'Design Homepage Layout',
            'description' => 'Create wireframes and mockups for the new homepage design',
            'status' => 'todo',
            'priority' => 'high',
            'tags' => ['design', 'frontend'],
            'due_date' => now()->addDays(7),
            'estimated_hours' => 8,
        ]);

        Task::factory()->create([
            'title' => 'Build Authentication System',
            'description' => 'Implement user login, registration, and password reset functionality',
            'status' => 'in_progress',
            'priority' => 'medium',
            'tags' => ['backend', 'feature'],
            'due_date' => now()->addDays(3),
            'estimated_hours' => 12,
        ]);

        Task::factory()->create([
            'title' => 'Set Up Database',
            'description' => 'Configure MySQL database and run initial migrations',
            'status' => 'completed',
            'priority' => 'high',
            'tags' => ['backend'],
            'due_date' => now()->subDays(2),
            'estimated_hours' => 4,
        ]);
    }
}
