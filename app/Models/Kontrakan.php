<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kontrakan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'address', 'description', 'image', 'status'];

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
