<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Expense;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\Unit;
use App\Services\ReportService;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(ReportService $reportService)
    {
        $currentMonth = Carbon::now()->format('Y-m');

        $stats = [
            'total_units' => Unit::count(),
            'available_units' => Unit::where('status', 'available')->count(),
            'occupied_units' => Unit::where('status', 'occupied')->count(),
            'active_tenants' => Tenant::where('status', 'active')->count(),
            'monthly_income' => $reportService->getMonthlyIncome($currentMonth),
            'total_outstanding' => $reportService->getTotalOutstanding(),
            'monthly_expense' => $reportService->getMonthlyExpense($currentMonth),
            'occupancy_rate' => $reportService->getOccupancyRate(),
        ];

        // Chart data - last 6 months
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i)->format('Y-m');
            $chartData[] = [
                'month' => Carbon::parse($month . '-01')->format('M Y'),
                'income' => $reportService->getMonthlyIncome($month),
                'expense' => $reportService->getMonthlyExpense($month),
            ];
        }

        $recentPayments = Payment::with(['bill.lease.tenant.user', 'bill.lease.unit'])
            ->latest()
            ->limit(5)
            ->get();

        $upcomingBills = Bill::with(['lease.tenant.user', 'lease.unit'])
            ->whereIn('status', ['unpaid', 'overdue'])
            ->orderBy('due_date')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/Index', compact('stats', 'chartData', 'recentPayments', 'upcomingBills'));
    }
}
