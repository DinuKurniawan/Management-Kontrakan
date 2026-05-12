<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        $penyewas = User::where('role', 'penyewa')->get();

        foreach ($penyewas as $user) {
            Tenant::create([
                'user_id' => $user->id,
                'identity_number' => '32' . str_pad(rand(1000000000, 9999999999), 10, '0'),
                'emergency_contact_name' => 'Keluarga ' . $user->name,
                'emergency_contact_phone' => '08' . rand(1000000000, 9999999999),
                'status' => 'active',
            ]);
        }
    }
}
