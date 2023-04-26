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
        $headline = new NewsCollection(News::skip(0)->take(6)->get());
        $popular = new NewsCollection(News::skip(0)->take(4)->get());
        $news = new NewsCollection(News::paginate(6));
        return Inertia::render('Home', [
            'headline' => $headline,
            'popular' => $popular,
            'news' => $news,
        ]);
    }
}
