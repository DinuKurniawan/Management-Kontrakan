<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Tenant;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function landing()
    {
        $stats = [
            'total_units' => Unit::count(),
            'available_units' => Unit::where('status', 'available')->count(),
            'active_tenants' => Tenant::where('status', 'active')->count(),
            'occupancy_rate' => Unit::count() > 0
                ? round(Unit::where('status', 'occupied')->count() / Unit::count() * 100)
                : 0,
        ];

        $units = Unit::with(['kontrakan', 'facilities'])
            ->where('status', 'available')
            ->limit(6)
            ->get();

        return Inertia::render('Public/Landing', compact('stats', 'units'));
    }

    public function units()
    {
        $units = Unit::with(['kontrakan', 'facilities'])
            ->where('status', 'available')
            ->paginate(12);

        return Inertia::render('Public/Units', ['units' => $units]);
    }

    public function unitDetail(Unit $unit)
    {
        $unit->load(['kontrakan', 'facilities']);
        return Inertia::render('Public/UnitDetail', ['unit' => $unit]);
    }

    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }
}
