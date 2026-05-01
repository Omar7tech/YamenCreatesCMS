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

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'status' => $status,
            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+30 days'),
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
