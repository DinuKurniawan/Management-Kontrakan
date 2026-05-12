<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $tenants = Tenant::with('user')
            ->when($request->search, fn ($q, $s) => $q->whereHas('user', fn ($q2) => $q2->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Tenants/Index', ['tenants' => $tenants, 'filters' => $request->only('search', 'status')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Tenants/Form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'password' => 'required|min:8',
            'identity_number' => 'nullable|string|max:30',
            'identity_card_image' => 'nullable|image|max:2048',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => 'penyewa',
        ]);

        $tenantData = $request->only('identity_number', 'emergency_contact_name', 'emergency_contact_phone');
        $tenantData['user_id'] = $user->id;

        if ($request->hasFile('identity_card_image')) {
            $tenantData['identity_card_image'] = $request->file('identity_card_image')->store('tenants/ktp', 'public');
        }

        $tenant = Tenant::create($tenantData);
        ActivityLogService::log('create', $tenant, "Membuat penyewa: {$user->name}");

        return redirect()->route('dashboard.tenants.index')->with('success', 'Penyewa berhasil ditambahkan.');
    }

    public function edit(Tenant $tenant)
    {
        $tenant->load('user');
        return Inertia::render('Dashboard/Tenants/Form', ['tenant' => $tenant]);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $tenant->user_id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'identity_number' => 'nullable|string|max:30',
            'identity_card_image' => 'nullable|image|max:2048',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
        ]);

        $tenant->user->update($request->only('name', 'email', 'phone', 'address'));

        $tenantData = $request->only('identity_number', 'emergency_contact_name', 'emergency_contact_phone', 'status');
        if ($request->hasFile('identity_card_image')) {
            if ($tenant->identity_card_image) Storage::disk('public')->delete($tenant->identity_card_image);
            $tenantData['identity_card_image'] = $request->file('identity_card_image')->store('tenants/ktp', 'public');
        }

        $tenant->update($tenantData);
        ActivityLogService::log('update', $tenant, "Mengupdate penyewa: {$tenant->user->name}");

        return redirect()->route('dashboard.tenants.index')->with('success', 'Penyewa berhasil diupdate.');
    }

    public function destroy(Tenant $tenant)
    {
        ActivityLogService::log('delete', $tenant, "Menghapus penyewa: {$tenant->user->name}");
        $tenant->user->delete();
        $tenant->delete();
        return redirect()->route('dashboard.tenants.index')->with('success', 'Penyewa berhasil dihapus.');
    }
}
