<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $url = 'https://picsum.photos/1000/500?random=' . fake()->numberBetween(1, 50);
        return [
            "caption" => fake()->sentence(2),
            "url" => $url,
            "status_id" => fake()->numberBetween(1, 3),
        ];
    }
}
