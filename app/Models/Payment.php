<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'bill_id', 'tenant_id', 'payment_date', 'amount', 'payment_method',
        'proof_image', 'status', 'verified_by', 'notes',
    ];

    protected function casts(): array
    {
        return ['payment_date' => 'date'];
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
