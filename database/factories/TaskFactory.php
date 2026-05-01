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

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(10),
            'status' => $status,
            'priority' => $priority,
            'tags' => $this->faker->optional(0.7)->randomElements(['bug', 'feature', 'enhancement', 'design'], $this->faker->numberBetween(1, 2)),
            'due_date' => $this->faker->optional(0.5)->dateTimeBetween('now', '+14 days'),
            'estimated_hours' => $this->faker->optional(0.4)->numberBetween(2, 16),
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
