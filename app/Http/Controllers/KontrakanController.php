<?php

namespace App\Http\Controllers;

use App\Models\Kontrakan;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KontrakanController extends Controller
{
    public function index(Request $request)
    {
        $kontrakans = Kontrakan::withCount('units')
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Kontrakan/Index', ['kontrakans' => $kontrakans, 'filters' => $request->only('search')]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Kontrakan/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('kontrakans', 'public');
        }

        $kontrakan = Kontrakan::create($data);
        ActivityLogService::log('create', $kontrakan, "Membuat kontrakan: {$kontrakan->name}");

        return redirect()->route('dashboard.kontrakan.index')->with('success', 'Kontrakan berhasil ditambahkan.');
    }

    public function edit(Kontrakan $kontrakan)
    {
        return Inertia::render('Dashboard/Kontrakan/Form', ['kontrakan' => $kontrakan]);
    }

    public function update(Request $request, Kontrakan $kontrakan)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            if ($kontrakan->image) Storage::disk('public')->delete($kontrakan->image);
            $data['image'] = $request->file('image')->store('kontrakans', 'public');
        }

        $kontrakan->update($data);
        ActivityLogService::log('update', $kontrakan, "Mengupdate kontrakan: {$kontrakan->name}");

        return redirect()->route('dashboard.kontrakan.index')->with('success', 'Kontrakan berhasil diupdate.');
    }

    public function destroy(Kontrakan $kontrakan)
    {
        ActivityLogService::log('delete', $kontrakan, "Menghapus kontrakan: {$kontrakan->name}");
        $kontrakan->delete();
        return redirect()->route('dashboard.kontrakan.index')->with('success', 'Kontrakan berhasil dihapus.');
    }
}
