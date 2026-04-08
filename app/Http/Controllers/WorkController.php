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
            ->get(['id', 'title', 'slug']);

        $requestedSlug = $request->string('category')->toString();
        $activeSlug = $categories->contains('slug', $requestedSlug)
            ? $requestedSlug
            : ($categories->first()?->slug ?? '');

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
                    ->map(fn (Category $c) => ['slug' => $c->slug, 'name' => $c->title])
                    ->values()
            ),

            'workActiveCategory' => $activeSlug,

            'workProjects' => fn () => WorkProjectResource::collection(
                Project::query()
                    ->whereHas('category', fn ($q) => $q->where('slug', $activeSlug))
                    ->published()
                    ->ordered()
                    ->with('media')
                    ->get()
            )->toArray($request),
        ]);
    }
}
