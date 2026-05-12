<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bill extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'lease_id', 'billing_month', 'rent_amount', 'electricity_amount',
        'water_amount', 'cleaning_amount', 'penalty_amount', 'total_amount',
        'due_date', 'status',
    ];

    protected function casts(): array
    {
        return ['due_date' => 'date'];
    }

    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
