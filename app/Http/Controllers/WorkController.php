<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkController extends Controller
{
    public function index(Request $request): Response
    {
        $programs = Program::query()
            ->select([
                'id',
                'title',
                'slug',
                'subtitle',
                'bullets',
                'features',
                'have_cta',
                'cta_text',
                'cta_url',
            ])
            ->with(['media' => fn ($query) => $query->orderBy('order_column')])
            ->ordered()
            ->get();

        return Inertia::render('work', [
            'programsSection' => [
                'sectionTitle' => 'Our Signature Programs',
                'programs' => WorkProgramResource::collection($programs)->toArray($request),
            ],
        ]);
    }
}
