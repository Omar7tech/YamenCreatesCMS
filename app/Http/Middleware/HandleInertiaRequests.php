<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'footerCategories' => fn () => Category::query()
                ->where('is_active', true)
                ->whereHas('projects', fn ($q) => $q->where('is_active', true))
                ->orderBy('sort')
                ->orderBy('id')
                ->get(['title', 'slug'])
                ->map(fn (Category $c) => ['name' => $c->title, 'slug' => $c->slug])
                ->values(),
        ];
    }
}
