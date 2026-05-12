<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Payment;
use App\Services\ActivityLogService;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::with(['bill.lease.tenant.user', 'bill.lease.unit', 'verifier'])
            ->when($request->search, fn ($q, $s) => $q->whereHas('bill.lease.tenant.user', fn ($q2) => $q2->where('name', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Payments/Index', ['payments' => $payments, 'filters' => $request->only('search', 'status')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Payments/Form', [
            'bills' => Bill::with(['lease.tenant.user', 'lease.unit'])->whereIn('status', ['unpaid', 'overdue'])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'bill_id' => 'required|exists:bills,id',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,transfer,qris',
            'proof_image' => 'nullable|image|max:2048',
            'notes' => 'nullable|string',
        ]);

        $bill = Bill::findOrFail($data['bill_id']);
        $data['tenant_id'] = $bill->lease->tenant_id;
        $data['status'] = 'accepted';
        $data['verified_by'] = auth()->id();

        if ($request->hasFile('proof_image')) {
            $data['proof_image'] = $request->file('proof_image')->store('payments', 'public');
        }

        $payment = Payment::create($data);
        $bill->update(['status' => 'paid']);

        ActivityLogService::log('create', $payment, "Mencatat pembayaran untuk tagihan #{$bill->id}");
        return redirect()->route('dashboard.payments.index')->with('success', 'Pembayaran berhasil dicatat.');
    }

    public function verify(Request $request, Payment $payment, PaymentService $paymentService)
    {
        $request->validate(['status' => 'required|in:accepted,rejected']);
        $paymentService->verifyPayment($payment, auth()->id(), $request->status);

        ActivityLogService::log('update', $payment, "Verifikasi pembayaran: {$request->status}");
        return back()->with('success', 'Pembayaran berhasil diverifikasi.');
    }

    public function destroy(Payment $payment)
    {
        if ($payment->proof_image) Storage::disk('public')->delete($payment->proof_image);
        $payment->delete();
        return redirect()->route('dashboard.payments.index')->with('success', 'Pembayaran berhasil dihapus.');
    }
}
