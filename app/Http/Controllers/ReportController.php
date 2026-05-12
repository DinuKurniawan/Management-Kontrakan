<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Expense;
use App\Models\Payment;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request, ReportService $reportService)
    {
        $year = $request->year ?? Carbon::now()->year;

        $monthlyData = [];
        for ($m = 1; $m <= 12; $m++) {
            $month = sprintf('%d-%02d', $year, $m);
            $income = $reportService->getMonthlyIncome($month);
            $expense = $reportService->getMonthlyExpense($month);
            $monthlyData[] = [
                'month' => Carbon::create($year, $m, 1)->format('M'),
                'income' => $income,
                'expense' => $expense,
                'profit' => $income - $expense,
            ];
        }

        $summary = [
            'total_income' => array_sum(array_column($monthlyData, 'income')),
            'total_expense' => array_sum(array_column($monthlyData, 'expense')),
            'total_profit' => array_sum(array_column($monthlyData, 'profit')),
            'outstanding' => $reportService->getTotalOutstanding(),
            'occupancy_rate' => $reportService->getOccupancyRate(),
        ];

        return Inertia::render('Dashboard/Reports/Index', [
            'monthlyData' => $monthlyData,
            'summary' => $summary,
            'year' => $year,
        ]);
    }

    public function exportPdf(Request $request, ReportService $reportService)
    {
        $year = $request->year ?? Carbon::now()->year;
        $monthlyData = [];
        for ($m = 1; $m <= 12; $m++) {
            $month = sprintf('%d-%02d', $year, $m);
            $income = $reportService->getMonthlyIncome($month);
            $expense = $reportService->getMonthlyExpense($month);
            $monthlyData[] = [
                'month' => Carbon::create($year, $m, 1)->format('M Y'),
                'income' => $income,
                'expense' => $expense,
                'profit' => $income - $expense,
            ];
        }

        $pdf = Pdf::loadView('reports.annual', ['monthlyData' => $monthlyData, 'year' => $year]);
        return $pdf->download("laporan-{$year}.pdf");
    }

    public function exportExcel(Request $request)
    {
        // Simple CSV export
        $year = $request->year ?? Carbon::now()->year;
        $payments = Payment::where('status', 'accepted')
            ->whereYear('payment_date', $year)
            ->with(['bill.lease.tenant.user', 'bill.lease.unit'])
            ->get();

        $filename = "laporan-pembayaran-{$year}.csv";
        $headers = ['Content-Type' => 'text/csv', 'Content-Disposition' => "attachment; filename={$filename}"];

        $callback = function () use ($payments) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Tanggal', 'Penyewa', 'Unit', 'Jumlah', 'Metode', 'Status']);
            foreach ($payments as $p) {
                fputcsv($file, [
                    $p->payment_date->format('d/m/Y'),
                    $p->bill->lease->tenant->user->name ?? '-',
                    $p->bill->lease->unit->unit_number ?? '-',
                    $p->amount,
                    $p->payment_method,
                    $p->status,
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
