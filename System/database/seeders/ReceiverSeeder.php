<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReceiverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            DB::table('Receivers')->insert([
                'name' => $faker->name(),
                'course' => $faker->word(),
                'year' => $faker->randomElement(['1', '2', '3']),
                'characteristics' => $faker->text(),
            ]);
        }
    }
}
