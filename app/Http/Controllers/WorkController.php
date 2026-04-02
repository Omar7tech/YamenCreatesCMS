<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        return Inertia::render('work');
    }
}
