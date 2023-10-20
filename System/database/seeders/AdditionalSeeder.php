<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdditionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            DB::table('Additionals')->insert([
                'name' => $faker->name(),
                'value' => $faker->randomFloat(3,0.1, 99.99),
            ]);
        }
    }
}
