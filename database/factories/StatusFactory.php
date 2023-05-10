<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // $statuses = ['Published', 'Draft', 'Suspended'];
        // $status = "";
        // foreach ($statuses as $item) {
        //     $status = $item;
        // }
        return [
            // "title" => $status,
            // "title" => fake()->randomElement(['Published', 'Draft', 'Suspended']),
            // "title" => fake()->word(),
        ];
    }
}
