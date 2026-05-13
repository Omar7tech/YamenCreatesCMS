<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact');
    }

    public function store(StoreInquiryRequest $request)
    {
        $validated = $request->validated();

        $sanitized = [
            'name' => strip_tags($validated['name']),
            'email' => isset($validated['email']) ? strip_tags($validated['email']) : null,
            'phone' => isset($validated['phone']) ? strip_tags($validated['phone']) : null,
            'message' => strip_tags($validated['message']),
        ];

        DB::transaction(function () use ($sanitized) {
            Inquiry::create($sanitized);
        });

        return back()->with('success', 'Thank you for your inquiry! We will get back to you soon.');
    }
}
