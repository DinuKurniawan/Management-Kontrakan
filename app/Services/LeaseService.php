<?php

namespace App\Services;

use App\Models\Lease;
use App\Models\Unit;

class LeaseService
{
    public function activate(Lease $lease): void
    {
        $lease->update(['status' => 'active']);
        $lease->unit->update(['status' => 'occupied']);
    }

    public function complete(Lease $lease): void
    {
        $lease->update(['status' => 'completed']);
        $lease->unit->update(['status' => 'available']);
    }

    public function cancel(Lease $lease): void
    {
        $lease->update(['status' => 'cancelled']);
        $lease->unit->update(['status' => 'available']);
    }
}
