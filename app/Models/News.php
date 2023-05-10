<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'author'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tag() {
        return $this->belongsTo(Tag::class);
    }

    public function media() {
        return $this->belongsTo(Media::class);
    }

    public function author() {
        return $this->belongsTo(User::class);
    }
}
