<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Kontrakan;
use App\Models\Unit;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        $units = Unit::with(['kontrakan', 'facilities'])
            ->when($request->search, fn ($q, $s) => $q->where('unit_number', 'like', "%{$s}%")->orWhereHas('kontrakan', fn ($q2) => $q2->where('name', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Units/Index', [
            'units' => $units,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Units/Form', [
            'kontrakans' => Kontrakan::where('status', 'active')->get(),
            'facilities' => Facility::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kontrakan_id' => 'required|exists:kontrakans,id',
            'unit_number' => 'required|string|max:50',
            'type' => 'nullable|string|max:50',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance',
            'description' => 'nullable|string',
            'size' => 'nullable|string|max:50',
            'image' => 'nullable|image|max:2048',
            'facilities' => 'nullable|array',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('units', 'public');
        }

        $unit = Unit::create(collect($data)->except('facilities')->toArray());
        if (!empty($data['facilities'])) {
            $unit->facilities()->sync($data['facilities']);
        }

        ActivityLogService::log('create', $unit, "Membuat unit: {$unit->unit_number}");
        return redirect()->route('dashboard.units.index')->with('success', 'Unit berhasil ditambahkan.');
    }

    public function edit(Unit $unit)
    {
        $unit->load('facilities');
        return Inertia::render('Dashboard/Units/Form', [
            'unit' => $unit,
            'kontrakans' => Kontrakan::where('status', 'active')->get(),
            'facilities' => Facility::all(),
        ]);
    }

    public function update(Request $request, Unit $unit)
    {
        $data = $request->validate([
            'kontrakan_id' => 'required|exists:kontrakans,id',
            'unit_number' => 'required|string|max:50',
            'type' => 'nullable|string|max:50',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance',
            'description' => 'nullable|string',
            'size' => 'nullable|string|max:50',
            'image' => 'nullable|image|max:2048',
            'facilities' => 'nullable|array',
        ]);

        if ($request->hasFile('image')) {
            if ($unit->image) Storage::disk('public')->delete($unit->image);
            $data['image'] = $request->file('image')->store('units', 'public');
        }

        $unit->update(collect($data)->except('facilities')->toArray());
        if (isset($data['facilities'])) {
            $unit->facilities()->sync($data['facilities']);
        }

        ActivityLogService::log('update', $unit, "Mengupdate unit: {$unit->unit_number}");
        return redirect()->route('dashboard.units.index')->with('success', 'Unit berhasil diupdate.');
    }

    public function destroy(Unit $unit)
    {
        ActivityLogService::log('delete', $unit, "Menghapus unit: {$unit->unit_number}");
        $unit->delete();
        return redirect()->route('dashboard.units.index')->with('success', 'Unit berhasil dihapus.');
    }
}
