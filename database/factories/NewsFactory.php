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
            "title" => fake()->sentence(5),
            "subtitle" => fake()->sentence(10),
            "content" => fake()->paragraph(3),
            "image" => fake()->sentence(1),
            "category_id" => fake()->randomDigitNotNull(),
            "tag_id" => fake()->randomDigitNotNull(),
            "author" => fake()->name()
        ];
    }
}
