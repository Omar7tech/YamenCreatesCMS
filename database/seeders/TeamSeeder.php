<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Yamen Al-Masri',
                'position' => 'Founder & Creative Director',
                'description' => 'Leading creative vision and brand strategy with passion for innovation.',
                'sort' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'Brand Strategist',
                'description' => 'Crafting compelling narratives that connect brands with their audience.',
                'sort' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Visual Designer',
                'description' => 'Transforming ideas into stunning visual experiences.',
                'sort' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Emma Rodriguez',
                'position' => 'UX/UI Designer',
                'description' => 'Creating intuitive digital experiences that users love.',
                'sort' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'David Kim',
                'position' => 'Content Creator',
                'description' => 'Telling stories that inspire and engage.',
                'sort' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Lisa Anderson',
                'position' => 'Digital Marketing Lead',
                'description' => 'Driving growth through data-driven marketing strategies.',
                'sort' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            Team::create($member);
        }
    }
}
