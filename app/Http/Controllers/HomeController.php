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
        $news = new NewsCollection(News::paginate(1));
        // dd($news);
        return Inertia::render('Home', [
            'news' => $news,
        ]);
    }
}
