<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "title" => fake()->sentence(10),
            "subtitle" => fake()->paragraphs(2, true),
            "content" => fake()->paragraphs(10, true),
            "media_id" => fake()->numberBetween(1, 50),
            "category_id" => fake()->randomDigitNotNull(),
            "tag_id" => fake()->randomDigitNotNull(),
            "author" => fake()->name()
        ];
    }
}
