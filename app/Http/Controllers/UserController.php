<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%"))
            ->when($request->role, fn ($q, $r) => $q->where('role', $r))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Users/Index', ['users' => $users, 'filters' => $request->only('search', 'role')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Users/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role' => 'required|in:super_admin,admin,penyewa',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        ActivityLogService::log('create', $user, "Membuat user: {$user->name}");

        return redirect()->route('dashboard.users.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Dashboard/Users/Form', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8',
            'role' => 'required|in:super_admin,admin,penyewa',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        ActivityLogService::log('update', $user, "Mengupdate user: {$user->name}");

        return redirect()->route('dashboard.users.index')->with('success', 'User berhasil diupdate.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Tidak bisa menghapus akun sendiri.');
        }

        ActivityLogService::log('delete', $user, "Menghapus user: {$user->name}");
        $user->delete();
        return redirect()->route('dashboard.users.index')->with('success', 'User berhasil dihapus.');
    }
}
