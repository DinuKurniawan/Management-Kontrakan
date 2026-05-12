<?php

namespace App\Services;

use App\Models\Bill;
use App\Models\Expense;
use App\Models\Payment;
use App\Models\Unit;
use Carbon\Carbon;

class ReportService
{
    public function getMonthlyIncome(string $month = null): float
    {
        $month = $month ?? Carbon::now()->format('Y-m');
        return Payment::where('status', 'accepted')
            ->whereYear('payment_date', substr($month, 0, 4))
            ->whereMonth('payment_date', substr($month, 5, 2))
            ->sum('amount');
    }

    public function getMonthlyExpense(string $month = null): float
    {
        $month = $month ?? Carbon::now()->format('Y-m');
        return Expense::whereYear('expense_date', substr($month, 0, 4))
            ->whereMonth('expense_date', substr($month, 5, 2))
            ->sum('amount');
    }

    public function getTotalOutstanding(): float
    {
        return Bill::whereIn('status', ['unpaid', 'overdue'])->sum('total_amount');
    }

    public function getOccupancyRate(): float
    {
        $total = Unit::count();
        if ($total === 0) return 0;
        $occupied = Unit::where('status', 'occupied')->count();
        return round(($occupied / $total) * 100, 1);
    }
}
