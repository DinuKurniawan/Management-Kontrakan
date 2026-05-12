<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PasswordResetRequestController extends Controller
{
    public function index()
    {
        $requests = PasswordResetRequest::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/ResetRequests/Index', [
            'requests' => $requests,
        ]);
    }

    public function handle(Request $request, PasswordResetRequest $passwordResetRequest)
    {
        $request->validate(['status' => 'required|in:approved,rejected']);

        $passwordResetRequest->update([
            'status' => $request->status,
            'handled_by' => Auth::id(),
        ]);

        if ($request->status === 'approved') {
            $newPassword = 'password123';
            $passwordResetRequest->user->update([
                'password' => Hash::make($newPassword),
            ]);
        }

        $message = $request->status === 'approved'
            ? 'Reset password disetujui. Password baru: password123'
            : 'Permintaan reset password ditolak.';

        return back()->with('success', $message);
    }
}
