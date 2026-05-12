<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $paidBills = Bill::where('status', 'paid')->get();

        foreach ($paidBills as $bill) {
            Payment::create([
                'bill_id' => $bill->id,
                'tenant_id' => $bill->lease->tenant_id,
                'payment_date' => Carbon::parse($bill->due_date)->subDays(rand(1, 5)),
                'amount' => $bill->total_amount,
                'payment_method' => ['cash', 'transfer', 'qris'][rand(0, 2)],
                'status' => 'accepted',
                'verified_by' => 1,
                'notes' => 'Pembayaran tepat waktu',
            ]);
        }
    }
}
