<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Resources\NewsCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // $news = News::all();
        $headline = new NewsCollection(News::with('category', 'media')->inRandomOrder()->limit(5)->get());
        $popular = new NewsCollection(News::with('category', 'media')->inRandomOrder()->limit(4)->get());
        $news = new NewsCollection(News::with('category', 'media')->paginate(6));
        return Inertia::render('Home', [
            'headline' => $headline,
            'popular' => $popular,
            'news' => $news,
        ]);
    }

    public function show($id)
    {
        $news = News::with('category', 'tag', 'media')->find($id);
        return Inertia::render('Detail', [
            'news' => $news
        ]);
    }
}
