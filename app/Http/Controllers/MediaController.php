<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\NewsCollection;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medias = new NewsCollection(Media::latest()->paginate(32));
        return Inertia::render('Media/Index', [
            'medias' => $medias,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Media/Create');
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
            'caption' => 'required',
            'image' => 'required',
        ]);

        $fileName = time().'.'.$request->image->extension();
        $request->image->move(public_path('uploads'), $fileName);

        $media = new Media;
        $media->caption = $request->caption;
        $media->url = $fileName;
        $media->save();

        return redirect()->route('media.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Media  $medium
     * @return \Illuminate\Http\Response
     */
    public function show(Media $medium)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Media  $medium
     * @return \Illuminate\Http\Response
     */
    public function edit(Media $medium)
    {
         return Inertia::render('Media/Edit', [
            'media' => $medium,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Media  $medium
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Media $medium)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Media  $medium
     * @return \Illuminate\Http\Response
     */
    public function destroy(Media $medium)
    {
        $medium->delete();
        return redirect()->route('media.index');
    }
}
