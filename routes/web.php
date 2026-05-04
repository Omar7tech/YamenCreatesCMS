<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/' , [HomeController::class , 'index'])->name('home');
Route::get('/work' , [WorkController::class , 'index'])->name('work');
Route::get('/work/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/contact' , [ContactController::class , 'index'])->name('contact');