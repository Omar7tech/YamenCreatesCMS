<?php

namespace App\Http\Controllers;

use App\Enums\SectionType;
use App\Models\Project;
use App\Models\ProjectSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load([
            'category:id,title,slug',
            'sections' => function ($query) {
                $query->active()->ordered();
            },
            'sections.media',
        ]);

        $featuredImage = null;
        $featuredMedia = $project->getFirstMedia(
            $project->media_type->value === 'image'
                ? Project::IMAGE_COLLECTION
                : Project::VIDEO_COLLECTION
        );

        if ($featuredMedia && $featuredMedia->hasGeneratedConversion('webp')) {
            $featuredImage = $featuredMedia->getUrl('webp');
        } elseif ($featuredMedia) {
            $featuredImage = $featuredMedia->getUrl();
        }

        $sections = $project->sections->map(function ($section) {
            $data = [
                'id' => (string) $section->id,
                'title' => $section->title,
                'type' => $section->type->value,
                'content' => $section->content,
            ];

            if (in_array($section->type, [SectionType::LeftImageText, SectionType::RightImageText])) {
                $media = $section->getFirstMedia(ProjectSection::SINGLE_IMAGE_COLLECTION);
                $data['image'] = $media && $media->hasGeneratedConversion('webp')
                    ? $media->getUrl('webp')
                    : $media?->getUrl();
            }

            if ($section->type === SectionType::ImageGallery) {
                $data['images'] = $section->getMedia(ProjectSection::GALLERY_IMAGES_COLLECTION)
                    ->map(fn ($media) => $media->hasGeneratedConversion('webp')
                        ? $media->getUrl('webp')
                        : $media->getUrl()
                    )
                    ->values()
                    ->toArray();
            }

            return $data;
        });

        return Inertia::render('project', [
            'project' => [
                'id' => (string) $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'category' => [
                    'name' => $project->category->title,
                    'slug' => $project->category->slug,
                ],
                'featuredImage' => $featuredImage,
                'mediaType' => $project->media_type->value,
                'mediaSrc' => $featuredImage,
                'sections' => $sections->toArray(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
