<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\RecentlyCreated;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $recentlyCreated = RecentlyCreated::orderBy('sort')
            ->get()
            ->map(fn (RecentlyCreated $item) => [
                'id' => $item->id,
                'image_1' => $item->getFirstMediaUrl(RecentlyCreated::IMAGE_1, 'webp')
                    ?: $item->getFirstMediaUrl(RecentlyCreated::IMAGE_1),
                'image_2' => $item->getFirstMediaUrl(RecentlyCreated::IMAGE_2, 'webp')
                    ?: $item->getFirstMediaUrl(RecentlyCreated::IMAGE_2),
                'image_3' => $item->getFirstMediaUrl(RecentlyCreated::IMAGE_3, 'webp')
                    ?: $item->getFirstMediaUrl(RecentlyCreated::IMAGE_3),
            ]);

        $clients = Client::where('is_active', true)
            ->orderBy('sort')
            ->get()
            ->map(fn (Client $client) => [
                'id' => $client->id,
                'name' => $client->name,
                'logo' => $client->getFirstMediaUrl('logo'),
            ])
            ->filter(fn ($client) => ! empty($client['logo']));

        return Inertia::render('welcome', [
            'recentlyCreated' => $recentlyCreated,
            'clients' => $clients,
        ]);
    }
}
