<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SendersSeeder::class,
            ReceiverSeeder::class,
            AdditionalSeeder::class,
            LettersSeeder::class,
            AdminsSeeder::class
        ]);
    }
}
