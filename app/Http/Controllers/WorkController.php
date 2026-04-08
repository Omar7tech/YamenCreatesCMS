<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkProgramResource;
use App\Http\Resources\WorkProjectResource;
use App\Models\Category;
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
                'sort',
                'is_active',
            ])
            ->with(['media' => fn ($query) => $query->orderBy('order_column')])
            ->published()
            ->ordered()
            ->get();

        $categories = Category::query()
            ->where('is_active', true)
            ->with(['projects' => function ($query) {
                $query->published()->ordered()->with('media');
            }])
            ->orderBy('sort')
            ->orderBy('id')
            ->get()
            ->filter(fn (Category $category) => $category->projects->isNotEmpty());

        return Inertia::render('work', [
            'programsSection' => [
                'sectionTitle' => 'Our Signature Programs',
                'programs' => WorkProgramResource::collection($programs)->toArray($request),
            ],
            'ourWork' => [
                'categories' => $categories->map(fn (Category $category) => [
                    'id' => $category->id,
                    'name' => $category->title,
                    'projects' => WorkProjectResource::collection($category->projects)->toArray($request),
                ])->values(),
            ],
        ]);
    }
}
