<?php

namespace Database\Seeders;

use App\Models\Kontrakan;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class KontrakanSeeder extends Seeder
{
    public function run(): void
    {
        $kontrakan = Kontrakan::create([
            'name' => 'Kontrakan Harmoni',
            'address' => 'Jl. Harmoni No. 45, Kelurahan Sukamaju, Kecamatan Cilandak, Jakarta Selatan',
            'description' => 'Kontrakan nyaman dan strategis di pusat kota dengan akses mudah ke transportasi umum.',
            'status' => 'active',
        ]);

        $kontrakan2 = Kontrakan::create([
            'name' => 'Kontrakan Sejahtera',
            'address' => 'Jl. Sejahtera No. 12, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat',
            'description' => 'Kontrakan modern dengan fasilitas lengkap dan lingkungan yang aman.',
            'status' => 'active',
        ]);

        $units = [
            ['kontrakan_id' => $kontrakan->id, 'unit_number' => 'A1', 'type' => 'Kamar', 'price' => 1500000, 'status' => 'occupied', 'description' => 'Kamar nyaman dengan ventilasi baik', 'size' => '3x4 m'],
            ['kontrakan_id' => $kontrakan->id, 'unit_number' => 'A2', 'type' => 'Kamar', 'price' => 1500000, 'status' => 'occupied', 'description' => 'Kamar dengan pencahayaan alami', 'size' => '3x4 m'],
            ['kontrakan_id' => $kontrakan->id, 'unit_number' => 'A3', 'type' => 'Kamar', 'price' => 1800000, 'status' => 'occupied', 'description' => 'Kamar luas dengan kamar mandi dalam', 'size' => '4x4 m'],
            ['kontrakan_id' => $kontrakan->id, 'unit_number' => 'A4', 'type' => 'Kamar', 'price' => 1800000, 'status' => 'available', 'description' => 'Kamar luas di lantai 2', 'size' => '4x4 m'],
            ['kontrakan_id' => $kontrakan->id, 'unit_number' => 'A5', 'type' => 'Studio', 'price' => 2500000, 'status' => 'available', 'description' => 'Studio dengan dapur kecil', 'size' => '5x5 m'],
            ['kontrakan_id' => $kontrakan2->id, 'unit_number' => 'B1', 'type' => 'Kamar', 'price' => 2000000, 'status' => 'available', 'description' => 'Kamar premium dengan AC', 'size' => '4x4 m'],
            ['kontrakan_id' => $kontrakan2->id, 'unit_number' => 'B2', 'type' => 'Studio', 'price' => 3000000, 'status' => 'maintenance', 'description' => 'Studio luas dengan balkon', 'size' => '5x6 m'],
            ['kontrakan_id' => $kontrakan2->id, 'unit_number' => 'B3', 'type' => 'Kamar', 'price' => 2000000, 'status' => 'available', 'description' => 'Kamar nyaman lantai dasar', 'size' => '4x4 m'],
        ];

        foreach ($units as $unitData) {
            $unit = Unit::create($unitData);
            // Attach random facilities
            $facilityIds = range(1, 10);
            shuffle($facilityIds);
            $unit->facilities()->attach(array_slice($facilityIds, 0, rand(3, 6)));
        }
    }
}
