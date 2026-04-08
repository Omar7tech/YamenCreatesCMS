<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkProgramResource;
use App\Http\Resources\WorkProjectResource;
use App\Models\Category;
use App\Models\Program;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->whereHas('projects', fn ($q) => $q->where('is_active', true))
            ->orderBy('sort')
            ->orderBy('id')
            ->get(['id', 'title']);

        $requestedId = $request->integer('category');
        $categoryId = $categories->contains('id', $requestedId)
            ? $requestedId
            : ($categories->first()?->id ?? 0);

        return Inertia::render('work', [
            'programsSection' => fn () => [
                'sectionTitle' => 'Our Signature Programs',
                'programs' => WorkProgramResource::collection(
                    Program::query()
                        ->select(['id', 'title', 'slug', 'subtitle', 'bullets', 'features', 'have_cta', 'cta_text', 'cta_url', 'sort', 'is_active'])
                        ->with(['media' => fn ($q) => $q->orderBy('order_column')])
                        ->published()
                        ->ordered()
                        ->get()
                )->toArray($request),
            ],

            'workCategories' => Inertia::always(
                $categories
                    ->map(fn (Category $c) => ['id' => $c->id, 'name' => $c->title])
                    ->values()
            ),

            'workActiveCategory' => $categoryId,

            'workProjects' => fn () => WorkProjectResource::collection(
                Project::query()
                    ->where('category_id', $categoryId)
                    ->published()
                    ->ordered()
                    ->with('media')
                    ->get()
            )->toArray($request),
        ]);
    }
}
