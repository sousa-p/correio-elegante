<?php

namespace Database\Seeders;

use App\Models\Candy;
use App\Models\Letter;
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

        for ($i = 0; $i < 5; $i++) {

            $letter = Letter::create([
                'type' => $faker->randomElement(['normal', 'especial']),
                'message' => $faker->text(),
                'sent' => $faker->boolean(),
                'recited' => $faker->boolean(),
                'receiver_id' => $faker->randomElement($receivers),
                'sender_id' => $faker->randomElement($senders)
            ]);

            $letter->save();

            $randomCandies = Candy::inRandomOrder()->limit($faker->randomNumber())->get();

            $letter->candies()->attach($randomCandies);
        }
    }
}
