<?php

namespace Database\Seeders;

use App\Models\Additional;
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
                'message' => $faker->text(),
                'receiver_id' => $faker->randomElement($receivers),
                'sender_id' => $faker->randomElement($senders)
            ]);

            $letter->save();

            $randomAdditionals = Additional::inRandomOrder()->limit($faker->randomNumber())->get();

            $letter->Additionals()->attach($randomAdditionals);
        }
    }
}
