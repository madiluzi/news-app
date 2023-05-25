<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // NewsCategory::factory()->count(20)->create();
        $categories = Category::all();

        // Populate the pivot table
        News::all()->each(function ($news) use ($categories) {
            $news->category()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}