<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LettersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        DB::table('Letters')->insert([
            'name_sender' => $faker->name(),
            'course_sender' => $faker->word(),
            'year_sender' => $faker->randomElement(['1', '2', '3']),
            'name_receiver' => $faker->name(),
            'course_receiver' => $faker->word(),
            'year_receiver' => $faker->randomElement(['1', '2', '3']),
            'characteristics_receiver' => $faker->text(150),
            'type' => $faker->randomElement(['normal', 'especial']),
            'message' => $faker->text(),
            'sent' => $faker->boolean(),
        ]);
    }
}
