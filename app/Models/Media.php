<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'caption', 'url'
    ];

    public function news() {
        return $this->hasMany(News::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }
}
