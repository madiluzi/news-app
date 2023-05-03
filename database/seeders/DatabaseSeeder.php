<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            TagSeeder::class,
            NewsSeeder::class,
            MediaSeeder::class,
            // UserSeeder::class,
        ]);
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);

        // for ($i=0; $i < 50; $i++) {
        //     \App\Models\Media::insert([
        //         'caption' => fake()->sentence(2),
        //         'url' => 'https://picsum.photos/400/500?random=' . $i + 1,
        //     ]);
        // }
    }
}
