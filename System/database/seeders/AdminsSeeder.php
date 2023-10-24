<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('Admins')->insert([
            'login' => 'admin',
            'password' => password_hash('admincorreiods2023', PASSWORD_DEFAULT),
        ]);
    }
}
