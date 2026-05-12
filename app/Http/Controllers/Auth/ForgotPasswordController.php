<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'reason' => 'nullable|string|max:500',
        ], [
            'email.exists' => 'Email tidak ditemukan dalam sistem.',
        ]);

        $user = User::where('email', $request->email)->first();

        $existing = PasswordResetRequest::where('user_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if ($existing) {
            return back()->withErrors(['email' => 'Permintaan reset password Anda sedang diproses.']);
        }

        PasswordResetRequest::create([
            'user_id' => $user->id,
            'reason' => $request->reason,
        ]);

        return back()->with('success', 'Permintaan reset password berhasil dikirim. Admin akan segera memproses.');
    }
}
