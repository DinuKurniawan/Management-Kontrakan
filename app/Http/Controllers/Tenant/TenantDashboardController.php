<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TenantDashboardController extends Controller
{
    private function getTenant()
    {
        return auth()->user()->tenant;
    }

    public function index()
    {
        $tenant = $this->getTenant();
        $activeLease = $tenant?->activeLease()?->with('unit.kontrakan')->first();

        $currentBills = Bill::whereHas('lease', fn ($q) => $q->where('tenant_id', $tenant?->id))
            ->whereIn('status', ['unpaid', 'overdue'])
            ->sum('total_amount');

        $recentPayments = Payment::where('tenant_id', $tenant?->id)
            ->with('bill')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Tenant/Dashboard', [
            'lease' => $activeLease,
            'outstanding' => $currentBills,
            'recentPayments' => $recentPayments,
        ]);
    }

    public function bills()
    {
        $tenant = $this->getTenant();
        $bills = Bill::whereHas('lease', fn ($q) => $q->where('tenant_id', $tenant?->id))
            ->with('lease.unit')
            ->latest()
            ->paginate(10);

        return Inertia::render('Tenant/Bills', ['bills' => $bills]);
    }

    public function billDetail(Bill $bill)
    {
        $tenant = $this->getTenant();
        abort_unless($bill->lease->tenant_id === $tenant?->id, 403);

        $bill->load(['lease.unit', 'payments']);
        return Inertia::render('Tenant/BillDetail', ['bill' => $bill]);
    }

    public function submitPayment(Request $request, Bill $bill)
    {
        $tenant = $this->getTenant();
        abort_unless($bill->lease->tenant_id === $tenant?->id, 403);

        $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,transfer,qris',
            'proof_image' => 'required|image|max:2048',
        ]);

        $proofPath = $request->file('proof_image')->store('payments', 'public');

        Payment::create([
            'bill_id' => $bill->id,
            'tenant_id' => $tenant->id,
            'payment_date' => now(),
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'proof_image' => $proofPath,
            'status' => 'pending',
        ]);

        $bill->update(['status' => 'pending_verification']);

        return back()->with('success', 'Bukti pembayaran berhasil dikirim. Menunggu verifikasi admin.');
    }

    public function payments()
    {
        $tenant = $this->getTenant();
        $payments = Payment::where('tenant_id', $tenant?->id)
            ->with('bill.lease.unit')
            ->latest()
            ->paginate(10);

        return Inertia::render('Tenant/Payments', ['payments' => $payments]);
    }

    public function invoice(Payment $payment)
    {
        $tenant = $this->getTenant();
        abort_unless($payment->tenant_id === $tenant?->id, 403);

        $payment->load(['bill.lease.tenant.user', 'bill.lease.unit']);
        $pdf = Pdf::loadView('invoices.payment', ['payment' => $payment]);
        return $pdf->download("invoice-{$payment->id}.pdf");
    }

    public function profile()
    {
        $user = auth()->user();
        $user->load('tenant');
        return Inertia::render('Tenant/Profile', ['user' => $user]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'current_password' => 'nullable|required_with:new_password',
            'new_password' => 'nullable|min:8|confirmed',
        ]);

        $user->update($request->only('name', 'phone', 'address'));

        if ($request->filled('new_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Password lama salah.']);
            }
            $user->update(['password' => Hash::make($request->new_password)]);
        }

        return back()->with('success', 'Profil berhasil diupdate.');
    }
}
