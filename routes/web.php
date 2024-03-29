<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    // })->middleware(['auth', 'verified'])->name('dashboard');
    })->name('dashboard');

    Route::resource('news', NewsController::class)
        // ->only(['index', 'store'])
        ->middleware(['auth', 'verified']);

    Route::resource('category', CategoryController::class)
        // ->only(['index', 'store'])
        ->middleware(['auth', 'verified']);

    Route::resource('tag', TagController::class)
        // ->only(['index', 'store'])
        ->middleware(['auth', 'verified']);

    Route::resource('media', MediaController::class)
        // ->only(['index', 'store'])
        ->middleware(['auth', 'verified']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/article/{id}', [HomeController::class, 'show'])->name('article');
Route::get('/category/{id}', [HomeController::class, 'category'])->name('category');
Route::get('/tag/{id}', [HomeController::class, 'tag'])->name('tag');
Route::get('/author/{id}', [HomeController::class, 'author'])->name('author');

require __DIR__.'/auth.php';