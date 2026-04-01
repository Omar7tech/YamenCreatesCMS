<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'title' => 'YC-FOUNDATION',
                'subtitle' => 'For businesses that need to grow and expand',
                'bullets' => [
                    ['bullet' => 'Scale operations and brand presence with control and clarity'],
                    ['bullet' => 'Optimize product and distribution channels'],
                    ['bullet' => 'Drive measurable sales performance'],
                    ['bullet' => 'Track, expand, and improve ROI and KPI performance'],
                    ['bullet' => 'Build partnerships and growth-driven campaigns']
                ],
                'features' => [
                    ['feature' => 'Brand Strategy'],
                    ['feature' => 'Target audience'],
                    ['feature' => 'Go-To-Market'],
                    ['feature' => 'Core Messaging'],
                    ['feature' => 'Creative Direction'],
                    ['feature' => 'Concept development']
                ],
                'have_cta' => true,
                'cta_text' => "Let's Talk",
                'cta_url' => '#contact'
            ],
            [
                'title' => 'YC-FRAMEWORK',
                'subtitle' => 'For established businesses needing strategic structure',
                'bullets' => [
                    ['bullet' => 'Develop comprehensive brand architecture'],
                    ['bullet' => 'Create scalable operational frameworks'],
                    ['bullet' => 'Implement data-driven decision processes'],
                    ['bullet' => 'Build sustainable growth models'],
                    ['bullet' => 'Establish market leadership positioning']
                ],
                'features' => [
                    ['feature' => 'Brand Architecture'],
                    ['feature' => 'Operational Design'],
                    ['feature' => 'Data Analytics'],
                    ['feature' => 'Growth Strategy'],
                    ['feature' => 'Market Positioning'],
                    ['feature' => 'Process Optimization']
                ],
                'have_cta' => true,
                'cta_text' => 'Get Started',
                'cta_url' => '#get-started'
            ],
            [
                'title' => 'YC-REPOSITION',
                'subtitle' => 'For brands needing market repositioning and revitalization',
                'bullets' => [
                    ['bullet' => 'Analyze current market position and opportunities'],
                    ['bullet' => 'Develop new brand positioning strategy'],
                    ['bullet' => 'Create compelling brand narratives'],
                    ['bullet' => 'Implement repositioning campaigns'],
                    ['bullet' => 'Measure brand perception changes']
                ],
                'features' => [
                    ['feature' => 'Market Research'],
                    ['feature' => 'Brand Positioning'],
                    ['feature' => 'Narrative Design'],
                    ['feature' => 'Campaign Strategy'],
                    ['feature' => 'Brand Perception'],
                    ['feature' => 'Competitive Analysis']
                ],
                'have_cta' => true,
                'cta_text' => 'Reposition Now',
                'cta_url' => '#reposition'
            ],
            [
                'title' => 'YC-SCALE',
                'subtitle' => 'For businesses ready to scale operations and impact',
                'bullets' => [
                    ['bullet' => 'Scale operations and brand presence with control and clarity'],
                    ['bullet' => 'Optimize product and distribution channels'],
                    ['bullet' => 'Drive measurable sales performance'],
                    ['bullet' => 'Track, expand, and improve ROI and KPI performance'],
                    ['bullet' => 'Build partnerships and growth-driven campaigns']
                ],
                'features' => [
                    ['feature' => 'Scaling Strategy'],
                    ['feature' => 'Distribution Optimization'],
                    ['feature' => 'Sales Performance'],
                    ['feature' => 'ROI Management'],
                    ['feature' => 'Partnership Development'],
                    ['feature' => 'Growth Campaigns']
                ],
                'have_cta' => true,
                'cta_text' => 'Scale With Us',
                'cta_url' => '#scale'
            ]
        ];

        foreach ($programs as $programData) {
            Program::create($programData);
        }
    }
}
