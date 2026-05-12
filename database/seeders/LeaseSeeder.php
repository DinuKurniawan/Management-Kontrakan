<?php

namespace Database\Seeders;

use App\Models\Lease;
use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class LeaseSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = Tenant::all();

        // Tenant 1 -> Unit A1
        Lease::create([
            'tenant_id' => $tenants[0]->id,
            'unit_id' => 1,
            'start_date' => Carbon::now()->subMonths(6),
            'end_date' => Carbon::now()->addMonths(6),
            'monthly_price' => 1500000,
            'deposit' => 1500000,
            'status' => 'active',
        ]);

        // Tenant 2 -> Unit A2
        Lease::create([
            'tenant_id' => $tenants[1]->id,
            'unit_id' => 2,
            'start_date' => Carbon::now()->subMonths(3),
            'end_date' => Carbon::now()->addMonths(9),
            'monthly_price' => 1500000,
            'deposit' => 1500000,
            'status' => 'active',
        ]);

        // Tenant 3 -> Unit A3
        Lease::create([
            'tenant_id' => $tenants[2]->id,
            'unit_id' => 3,
            'start_date' => Carbon::now()->subMonths(2),
            'end_date' => Carbon::now()->addMonths(10),
            'monthly_price' => 1800000,
            'deposit' => 1800000,
            'status' => 'active',
        ]);
    }
}
