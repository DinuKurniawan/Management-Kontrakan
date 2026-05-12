<?php

namespace App\Services;

use App\Models\Bill;
use App\Models\Lease;
use Carbon\Carbon;

class BillingService
{
    public function generateMonthlyBills(string $month = null): int
    {
        $month = $month ?? Carbon::now()->format('Y-m');
        $activeLeases = Lease::where('status', 'active')->get();
        $count = 0;

        foreach ($activeLeases as $lease) {
            $exists = Bill::where('lease_id', $lease->id)
                ->where('billing_month', $month)
                ->exists();

            if (!$exists) {
                Bill::create([
                    'lease_id' => $lease->id,
                    'billing_month' => $month,
                    'rent_amount' => $lease->monthly_price,
                    'total_amount' => $lease->monthly_price,
                    'due_date' => Carbon::parse($month . '-10'),
                    'status' => 'unpaid',
                ]);
                $count++;
            }
        }

        return $count;
    }

    public function markOverdueBills(): int
    {
        return Bill::where('status', 'unpaid')
            ->where('due_date', '<', Carbon::today())
            ->update(['status' => 'overdue']);
    }
}
