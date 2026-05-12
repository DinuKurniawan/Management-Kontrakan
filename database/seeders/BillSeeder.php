<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Lease;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BillSeeder extends Seeder
{
    public function run(): void
    {
        $leases = Lease::where('status', 'active')->get();

        foreach ($leases as $lease) {
            // Generate bills for past 3 months
            for ($i = 2; $i >= 0; $i--) {
                $month = Carbon::now()->subMonths($i);
                $status = $i > 0 ? 'paid' : 'unpaid';

                Bill::create([
                    'lease_id' => $lease->id,
                    'billing_month' => $month->format('Y-m'),
                    'rent_amount' => $lease->monthly_price,
                    'electricity_amount' => rand(50, 150) * 1000,
                    'water_amount' => rand(30, 80) * 1000,
                    'cleaning_amount' => 50000,
                    'penalty_amount' => 0,
                    'total_amount' => $lease->monthly_price + rand(130, 280) * 1000,
                    'due_date' => $month->copy()->day(10),
                    'status' => $status,
                ]);
            }
        }
    }
}
