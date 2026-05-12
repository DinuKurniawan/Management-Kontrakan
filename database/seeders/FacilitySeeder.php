<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        $facilities = [
            ['name' => 'AC', 'icon' => 'AirVent'],
            ['name' => 'WiFi', 'icon' => 'Wifi'],
            ['name' => 'Kamar Mandi Dalam', 'icon' => 'Bath'],
            ['name' => 'Tempat Tidur', 'icon' => 'Bed'],
            ['name' => 'Lemari', 'icon' => 'Archive'],
            ['name' => 'Dapur', 'icon' => 'CookingPot'],
            ['name' => 'Parkir Motor', 'icon' => 'Bike'],
            ['name' => 'Parkir Mobil', 'icon' => 'Car'],
            ['name' => 'CCTV', 'icon' => 'Camera'],
            ['name' => 'Keamanan 24 Jam', 'icon' => 'Shield'],
        ];

        foreach ($facilities as $f) {
            Facility::create($f);
        }
    }
}
