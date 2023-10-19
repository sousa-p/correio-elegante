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

        $senders = DB::table('Senders')->pluck('id')->toArray();
        $receivers = DB::table('Receivers')->pluck('id')->toArray();


        for ($i = 0; $i < 10; $i++) {
            DB::table('Letters')->insert([
                'type' => $faker->randomElement(['normal', 'especial']),
                'message' => $faker->text(),
                'sent' => $faker->boolean(),
                'candies' => $faker->numberBetween(0, 10),
                'receiver_id' => $faker->randomElement($receivers),
                'sender_id' => $faker->randomElement($senders),
            ]);
        }
    }
}
