<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@kontrakan.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'phone' => '081234567890',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Admin Kontrakan',
            'email' => 'admin@kontrakan.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '081234567891',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Budi Santoso',
            'email' => 'penyewa@kontrakan.com',
            'password' => Hash::make('password'),
            'role' => 'penyewa',
            'phone' => '081234567892',
            'address' => 'Jl. Merdeka No. 10, Jakarta',
            'status' => 'active',
        ]);

        // Additional tenants
        User::create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@kontrakan.com',
            'password' => Hash::make('password'),
            'role' => 'penyewa',
            'phone' => '081234567893',
            'address' => 'Jl. Sudirman No. 5, Jakarta',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Ahmad Fauzi',
            'email' => 'ahmad@kontrakan.com',
            'password' => Hash::make('password'),
            'role' => 'penyewa',
            'phone' => '081234567894',
            'address' => 'Jl. Gatot Subroto No. 15, Jakarta',
            'status' => 'active',
        ]);
    }
}
