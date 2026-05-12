<?php

namespace App\Services;

use App\Models\Bill;
use App\Models\Payment;

class PaymentService
{
    public function verifyPayment(Payment $payment, int $verifiedBy, string $status): void
    {
        $payment->update([
            'status' => $status,
            'verified_by' => $verifiedBy,
        ]);

        if ($status === 'accepted') {
            $bill = $payment->bill;
            $totalPaid = $bill->payments()->where('status', 'accepted')->sum('amount');
            if ($totalPaid >= $bill->total_amount) {
                $bill->update(['status' => 'paid']);
            }
        }
    }
}
