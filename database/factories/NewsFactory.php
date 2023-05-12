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
        $paragraphs = fake()->paragraphs(rand(6, 10));
        $content = "";
        foreach ($paragraphs as $item) {
            $content .= "<p>{$item}</p>";
        }
        return [
            "title" => fake()->realText(rand(50, 75)),
            "subtitle" => fake()->realText(200),
            "content" => $content,
            "media_id" => fake()->numberBetween(1, 50),
            "category_id" => fake()->randomDigitNotNull(),
            "tag_id" => fake()->randomDigitNotNull(),
            "author_id" => fake()->randomDigitNotNull(),
            "status_id" => fake()->numberBetween(1, 3),
        ];
    }
}
