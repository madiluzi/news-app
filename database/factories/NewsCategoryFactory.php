<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NewsCategory>
 */
class NewsCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $news = News::where('status_id', 1)->get();
        $categories = Category::where('status_id', 1)->get();
        return [
            "news_id" => News::factory(),
            // "news_id" => fake()->randomElement($news),
            "category_id" => Category::factory(),
            // "category_id" => fake()->randomElement($categories),
        ];
    }
}