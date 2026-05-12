<?php

namespace App\Http\Controllers;

use App\Models\Lease;
use App\Models\Tenant;
use App\Models\Unit;
use App\Services\ActivityLogService;
use App\Services\LeaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaseController extends Controller
{
    public function index(Request $request)
    {
        $leases = Lease::with(['tenant.user', 'unit.kontrakan'])
            ->when($request->search, fn ($q, $s) => $q->whereHas('tenant.user', fn ($q2) => $q2->where('name', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Leases/Index', ['leases' => $leases, 'filters' => $request->only('search', 'status')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Leases/Form', [
            'tenants' => Tenant::with('user')->where('status', 'active')->get(),
            'units' => Unit::where('status', 'available')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'unit_id' => 'required|exists:units,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'monthly_price' => 'required|numeric|min:0',
            'deposit' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,completed,cancelled',
        ]);

        $lease = Lease::create($data);

        if ($data['status'] === 'active') {
            $lease->unit->update(['status' => 'occupied']);
        }

        ActivityLogService::log('create', $lease, "Membuat kontrak sewa untuk unit {$lease->unit->unit_number}");
        return redirect()->route('dashboard.leases.index')->with('success', 'Kontrak berhasil dibuat.');
    }

    public function edit(Lease $lease)
    {
        $lease->load(['tenant.user', 'unit']);
        return Inertia::render('Dashboard/Leases/Form', [
            'lease' => $lease,
            'tenants' => Tenant::with('user')->where('status', 'active')->get(),
            'units' => Unit::whereIn('status', ['available', 'occupied'])->get(),
        ]);
    }

    public function update(Request $request, Lease $lease)
    {
        $data = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'unit_id' => 'required|exists:units,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'monthly_price' => 'required|numeric|min:0',
            'deposit' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,completed,cancelled',
        ]);

        $lease->update($data);
        ActivityLogService::log('update', $lease, "Mengupdate kontrak sewa");

        return redirect()->route('dashboard.leases.index')->with('success', 'Kontrak berhasil diupdate.');
    }

    public function updateStatus(Request $request, Lease $lease, LeaseService $leaseService)
    {
        $request->validate(['status' => 'required|in:active,completed,cancelled']);

        match ($request->status) {
            'active' => $leaseService->activate($lease),
            'completed' => $leaseService->complete($lease),
            'cancelled' => $leaseService->cancel($lease),
        };

        return back()->with('success', 'Status kontrak berhasil diupdate.');
    }

    public function destroy(Lease $lease)
    {
        if ($lease->status === 'active') {
            $lease->unit->update(['status' => 'available']);
        }
        ActivityLogService::log('delete', $lease, "Menghapus kontrak sewa");
        $lease->delete();
        return redirect()->route('dashboard.leases.index')->with('success', 'Kontrak berhasil dihapus.');
    }
}
