<?php

namespace Database\Seeders;

use App\Models\Program;
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
                'subtitle' => 'For businesses that need to start.',
                'bullets' => [
                    ['bullet' => 'Shift from an operating business to a clearly defined brand'],
                    ['bullet' => 'Establish consistent brand communication, purpose, and direction'],
                    ['bullet' => 'Identify and own the highest-value product or service opportunity'],
                    ['bullet' => 'Structure and optimize the sales and conversion funnel'],
                    ['bullet' => 'Build a confident, aligned digital presence'],
                ],
                'features' => [
                    ['feature' => 'Brand Strategy'],
                    ['feature' => 'Target audience'],
                    ['feature' => 'Go-To-Market'],
                    ['feature' => 'Core Messaging'],
                    ['feature' => 'Creative Direction Brand Strategy'],
                    ['feature' => 'Concept development'],
                ],
                'have_cta' => true,
                'cta_text' => 'Start with us',
                'cta_url' => null,
            ],
            [
                'title' => 'YC-FRAMEWORK',
                'subtitle' => 'For businesses that need to structure.',
                'bullets' => [
                    ['bullet' => 'Shift from an operating business to a clearly defined brand'],
                    ['bullet' => 'Establish consistent brand communication, purpose, and direction'],
                    ['bullet' => 'Identify and own the highest-value product or service opportunity'],
                    ['bullet' => 'Structure and optimize the sales and conversion funnel'],
                    ['bullet' => 'Build a confident, aligned digital presence'],
                ],
                'features' => [
                    ['feature' => 'Business Audit'],
                    ['feature' => 'Visual identity'],
                    ['feature' => 'Verbal identity'],
                    ['feature' => 'Brand Strategy'],
                    ['feature' => 'Market Opportunity'],
                    ['feature' => 'Core Messaging'],
                ],
                'have_cta' => true,
                'cta_text' => 'Structure with us',
                'cta_url' => null,
            ],
            [
                'title' => 'YC-REPOSITION',
                'subtitle' => 'For businesses that need to realign and evolve.',
                'bullets' => [
                    ['bullet' => 'Optimize and rationalize existing brand assets'],
                    ['bullet' => 'Reposition the brand within the correct market context'],
                    ['bullet' => 'Accelerate digital growth through clearer positioning'],
                    ['bullet' => 'Evolve brand visuals and verbal systems without losing equity'],
                    ['bullet' => 'Restructure and optimize the content ecosystem'],
                ],
                'features' => [
                    ['feature' => 'Marketing strategy'],
                    ['feature' => 'Website'],
                    ['feature' => 'Creative Direction'],
                    ['feature' => 'Campaigns'],
                    ['feature' => 'Brand Audit'],
                    ['feature' => 'Rebranding'],
                ],
                'have_cta' => true,
                'cta_text' => 'Reposition with us',
                'cta_url' => null,
            ],
            [
                'title' => 'YC-SCALE',
                'subtitle' => 'For businesses that need to grow and expand.',
                'bullets' => [
                    ['bullet' => 'Scale operations and brand presence with control and clarity'],
                    ['bullet' => 'Optimize product and distribution channels'],
                    ['bullet' => 'Drive measurable sales performance'],
                    ['bullet' => 'Track, expand, and improve ROI and KPI performance'],
                    ['bullet' => 'Build partnerships and growth-driven campaigns'],
                ],
                'features' => [
                    ['feature' => 'Content Creation'],
                    ['feature' => 'Production'],
                    ['feature' => 'PR'],
                    ['feature' => 'Media'],
                    ['feature' => 'ART Direction'],
                    ['feature' => 'Sales Channel Development'],
                    ['feature' => 'Performance-led campaigns'],
                ],
                'have_cta' => true,
                'cta_text' => 'Scale with us',
                'cta_url' => null,
            ],
        ];

        foreach ($programs as $programData) {
            Program::query()->updateOrCreate(
                ['title' => $programData['title']],
                $programData,
            );
        }
    }
}
