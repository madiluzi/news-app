<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Resources\NewsCollection;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $headline = new NewsCollection(News::with('category', 'media')->where('status_id', 1)->inRandomOrder()->limit(5)->get());
        $popular = new NewsCollection(News::where('status_id', 1)->inRandomOrder()->limit(4)->get());
        $news = new NewsCollection(News::with('category', 'media', 'author')->where('status_id', 1)->paginate(6));
        return Inertia::render('Home', [
            'headline' => $headline,
            'popular' => $popular,
            'news' => $news,
        ]);
    }

    public function show($id)
    {
        $news = News::with('category', 'tag', 'media', 'author')->find($id);
        return Inertia::render('Detail', [
            'news' => $news
        ]);
    }

    public function category($id)
    {
        $category = Category::find($id);
        $news = new NewsCollection(News::with('category', 'media', 'author')->whereHas('category', function($q) use($id) {
            $q->where('category_id', $id);
        })->paginate(6));
        return Inertia::render('Category', [
            'category' => $category,
            'news' => $news
        ]);
    }

    public function tag($id)
    {
        $news = new NewsCollection(News::with('category', 'media', 'author')->where('tag_id', $id)->paginate(6));
        return Inertia::render('Tag', [
            'news' => $news
        ]);
    }

    public function author($id)
    {
        $news = new NewsCollection(News::with('category', 'media', 'author')->where('author_id', $id)->paginate(6));
        return Inertia::render('Author', [
            'news' => $news
        ]);
    }
}