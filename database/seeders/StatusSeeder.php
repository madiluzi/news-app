<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::factory()->count(3)
        ->state(new Sequence(
            ['title' => 'Published'],
            ['title' => 'Draft'],
            ['title' => 'Suspended'],
        ))->create();
    }
}
