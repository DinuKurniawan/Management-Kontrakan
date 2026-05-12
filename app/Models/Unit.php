<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'kontrakan_id', 'unit_number', 'type', 'price', 'status', 'description', 'size', 'image',
    ];

    public function kontrakan()
    {
        return $this->belongsTo(Kontrakan::class);
    }

    public function facilities()
    {
        return $this->belongsToMany(Facility::class, 'unit_facilities');
    }

    public function leases()
    {
        return $this->hasMany(Lease::class);
    }

    public function activeLease()
    {
        return $this->hasOne(Lease::class)->where('status', 'active');
    }
}
