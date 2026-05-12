<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::withCount('units')->get();
        return Inertia::render('Dashboard/Facilities/Index', ['facilities' => $facilities]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
        ]);

        Facility::create($data);
        return back()->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function update(Request $request, Facility $facility)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
        ]);

        $facility->update($data);
        return back()->with('success', 'Fasilitas berhasil diupdate.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();
        return back()->with('success', 'Fasilitas berhasil dihapus.');
    }
}
