<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['super_admin', 'admin']);
    }

    public function create(User $user): bool
    {
        return $user->role === 'super_admin';
    }

    public function update(User $user, User $model): bool
    {
        if ($user->role === 'super_admin') return true;
        if ($user->role === 'admin' && $model->role !== 'super_admin') return true;
        return $user->id === $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        if ($model->role === 'super_admin' && $user->role !== 'super_admin') return false;
        return $user->role === 'super_admin';
    }
}
