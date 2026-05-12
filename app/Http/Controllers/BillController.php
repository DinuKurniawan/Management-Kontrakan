<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Lease;
use App\Services\BillingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    public function index(Request $request)
    {
        $bills = Bill::with(['lease.tenant.user', 'lease.unit'])
            ->when($request->search, fn ($q, $s) => $q->whereHas('lease.tenant.user', fn ($q2) => $q2->where('name', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->month, fn ($q, $m) => $q->where('billing_month', $m))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Bills/Index', ['bills' => $bills, 'filters' => $request->only('search', 'status', 'month')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Bills/Form', [
            'leases' => Lease::with(['tenant.user', 'unit'])->where('status', 'active')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'lease_id' => 'required|exists:leases,id',
            'billing_month' => 'required|string',
            'rent_amount' => 'required|numeric|min:0',
            'electricity_amount' => 'nullable|numeric|min:0',
            'water_amount' => 'nullable|numeric|min:0',
            'cleaning_amount' => 'nullable|numeric|min:0',
            'penalty_amount' => 'nullable|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'required|in:unpaid,pending_verification,paid,overdue',
        ]);

        $data['total_amount'] = ($data['rent_amount'] ?? 0) + ($data['electricity_amount'] ?? 0)
            + ($data['water_amount'] ?? 0) + ($data['cleaning_amount'] ?? 0) + ($data['penalty_amount'] ?? 0);

        Bill::create($data);
        return redirect()->route('dashboard.bills.index')->with('success', 'Tagihan berhasil dibuat.');
    }

    public function edit(Bill $bill)
    {
        $bill->load(['lease.tenant.user', 'lease.unit']);
        return Inertia::render('Dashboard/Bills/Form', [
            'bill' => $bill,
            'leases' => Lease::with(['tenant.user', 'unit'])->where('status', 'active')->get(),
        ]);
    }

    public function update(Request $request, Bill $bill)
    {
        $data = $request->validate([
            'rent_amount' => 'required|numeric|min:0',
            'electricity_amount' => 'nullable|numeric|min:0',
            'water_amount' => 'nullable|numeric|min:0',
            'cleaning_amount' => 'nullable|numeric|min:0',
            'penalty_amount' => 'nullable|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'required|in:unpaid,pending_verification,paid,overdue',
        ]);

        $data['total_amount'] = ($data['rent_amount'] ?? 0) + ($data['electricity_amount'] ?? 0)
            + ($data['water_amount'] ?? 0) + ($data['cleaning_amount'] ?? 0) + ($data['penalty_amount'] ?? 0);

        $bill->update($data);
        return redirect()->route('dashboard.bills.index')->with('success', 'Tagihan berhasil diupdate.');
    }

    public function generate(Request $request, BillingService $billingService)
    {
        $request->validate(['month' => 'required|string']);
        $count = $billingService->generateMonthlyBills($request->month);
        return back()->with('success', "{$count} tagihan berhasil digenerate.");
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();
        return redirect()->route('dashboard.bills.index')->with('success', 'Tagihan berhasil dihapus.');
    }
}
