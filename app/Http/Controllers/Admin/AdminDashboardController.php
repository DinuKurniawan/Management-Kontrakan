<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\Unit;
use App\Services\ReportService;
use Carbon\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
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
        ];

        $recentPayments = Payment::with(['bill.lease.tenant.user', 'bill.lease.unit'])
            ->latest()
            ->limit(5)
            ->get();

        $upcomingBills = Bill::with(['lease.tenant.user', 'lease.unit'])
            ->whereIn('status', ['unpaid', 'overdue'])
            ->orderBy('due_date')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentPayments', 'upcomingBills'));
    }
}
