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
        $additionals = [
            [
                'name' => 'Simples',
                'value' => 1.50
            ],
            [
                'name' => 'Doce Fini',
                'value' => 3
            ],
            [
                'name' => 'Doce Batom',
                'value' => 3.50
            ],
            [
                'name' => 'Batom e Fini',
                'value' => 4.50
            ],
            [
                'name' => 'Música',
                'value' => 0.5,
            ],
            [
                'name' => 'Anunciar',
                'value' => 1.50
            ],
            [
                'name' => 'Eu Shippo',
                'value' => 2.5
            ]
        ];

        foreach($additionals as $additional)
            DB::table('Additionals')->insert($additional);
    }
}
