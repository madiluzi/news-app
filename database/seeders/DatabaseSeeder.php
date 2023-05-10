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
            StatusSeeder::class,
            // UserSeeder::class,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'image' => 'https://randomuser.me/api/portraits/med/men/1.jpg'
        ]);

        \App\Models\User::factory(10)->create();

        // for ($i=0; $i < 10; $i++) {
        //     \App\Models\Media::insert([
        //         'caption' => fake()->sentence(2),
        //         'url' => 'https://picsum.photos/400/500?random=' . $i + 1,
        //     ]);
        // }
    }
}
