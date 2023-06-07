<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use App\Models\News;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Media;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\CategoryCollection;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::with('category', 'tag', 'author')->latest()->paginate(10));
        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = new CategoryCollection(Category::all());
        $tags = new CategoryCollection(Tag::all());
        return Inertia::render('Admin/News/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'content' => 'required',
            'media' => 'required',
            'category' => 'required',
            'tag' => 'required',
        ]);

        // $fileNameWithExt = $request->file('media')->getClientOriginalName();
        // $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
        $fileExt = $request->file('media')->getClientOriginalExtension();
        // $fileNameSave = $fileName . '_' . time() . '.' . $fileExt;
        $fileNameSave = time() . '.' . $fileExt;
        $path = $request->file('media')->storeAs('media', $fileNameSave, 'public');
        // dd($fileName);
        // $request->media->move(public_path('uploads'), $fileName);

        $media = new Media;
        $media->caption = $request->title;
        $media->url = $path;
        $media->save();

        $news = new News;
        $news->title = $request->title;
        $news->subtitle = $request->subtitle;
        $news->content = $request->content;
        $news->media_id = $media::latest()->first()->id;
        $news->category_id = $request->category;
        $news->tag_id = $request->tag;
        $news->author_id = auth()->user()->id;
        $news->save();

        return redirect()->route('news.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        return Inertia::render('Admin/News/Create', [
            'news' => $news,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news)
    {
        $categories = new CategoryCollection(Category::all());
        $tags = new CategoryCollection(Tag::all());
        // $media = Media::find($news->media_id);
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
            'media' => $news->media,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'content' => 'required',
            'category' => 'required',
            'tag' => 'required',
        ]);

        $news = News::find($request->id);
        $news->title = $request->title;
        $news->subtitle = $request->subtitle;
        $news->content = $request->content;
        $news->category_id = $request->category;
        $news->tag_id = $request->tag;
        $news->save();

        return redirect()->route('news.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('news.index');
    }
}
