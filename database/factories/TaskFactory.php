<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Relaticle\Flowforge\Services\DecimalPosition;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    /** @var array<string, string> Track last position per status */
    private static array $lastPositions = [];

    public function definition(): array
    {
        $status = $this->faker->randomElement(['todo', 'in_progress', 'completed']);
        $priority = $this->faker->randomElement(['low', 'medium', 'high']);
        $progress = match($status) {
            'todo' => $this->faker->numberBetween(0, 20),
            'in_progress' => $this->faker->numberBetween(20, 80),
            'completed' => 100,
        };

        return [
            'title' => $this->faker->sentence(3),
            'description' => '<p>' . $this->faker->paragraph() . '</p><ul><li>' . $this->faker->sentence() . '</li><li>' . $this->faker->sentence() . '</li></ul>',
            'status' => $status,
            'priority' => $priority,
            'assignee' => $this->faker->optional(0.7)->name(),
            'tags' => $this->faker->optional(0.8)->randomElements(['bug', 'feature', 'enhancement', 'design', 'urgent', 'backend', 'frontend'], $this->faker->numberBetween(1, 3)),
            'due_date' => $this->faker->optional(0.6)->dateTimeBetween('now', '+30 days'),
            'estimated_hours' => $this->faker->optional(0.5)->numberBetween(1, 40),
            'progress' => $progress,
            'position' => $this->generatePositionForStatus($status),
        ];
    }

    private function generatePositionForStatus(string $status): string
    {
        if (!isset(self::$lastPositions[$status])) {
            $position = DecimalPosition::forEmptyColumn();
        } else {
            $position = DecimalPosition::after(self::$lastPositions[$status]);
        }

        self::$lastPositions[$status] = $position;

        return $position;
    }
}
