<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'position' => fake()->randomElement([
                'Creative Director',
                'Brand Strategist',
                'Visual Designer',
                'UX/UI Designer',
                'Content Creator',
                'Digital Marketing Lead',
            ]),
            'description' => fake()->optional(0.7)->sentence(12),
            'sort' => 0,
            'is_active' => true,
        ];
    }
}
