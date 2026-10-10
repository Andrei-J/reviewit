<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get paginated users with optional search, plan, status, and sort filters.
     *
     * @param  array{
     *     search?: string|null,
     *     status?: string|null,
     *     plan?: string|null,
     *     sort?: string|null,
     * }  $filters
     */
    public function getPaginatedUsers(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = User::query();

        // 1. Search by name, email, or user code/id
        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $cleanCode = preg_replace('/^USR-0*/i', '', $search);

            $query->where(function (Builder $q) use ($search, $cleanCode) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");

                if (! empty($cleanCode) && is_numeric($cleanCode)) {
                    $q->orWhere('id', (int) $cleanCode);
                }
            });
        }

        // 2. Status filter: 'active' or 'banned'
        if (! empty($filters['status']) && $filters['status'] !== 'all') {
            if ($filters['status'] === 'active') {
                $query->whereNull('banned_at');
            } elseif ($filters['status'] === 'banned') {
                $query->whereNotNull('banned_at');
            }
        }

        // 3. Subscription plan filter: 'free' or 'premium'
        if (! empty($filters['plan']) && $filters['plan'] !== 'all') {
            $query->where('plan', $filters['plan']);
        }

        // 4. Sorting
        match ($filters['sort'] ?? 'newest') {
            'oldest' => $query->orderBy('created_at', 'asc'),
            'name_asc' => $query->orderBy('name', 'asc'),
            'name_desc' => $query->orderBy('name', 'desc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Compute platform-wide user community counts for the metrics cards and tabs.
     *
     * @return array{
     *     total: int,
     *     active: int,
     *     banned: int,
     *     premium: int,
     *     free: int,
     * }
     */
    public function getCommunityStats(): array
    {
        $total = User::count();
        $banned = User::whereNotNull('banned_at')->count();
        $active = $total - $banned;
        $premium = User::where('plan', 'premium')->count();
        $free = $total - $premium;

        return [
            'total' => $total,
            'active' => $active,
            'banned' => $banned,
            'premium' => $premium,
            'free' => $free,
        ];
    }

    /**
     * Find a user by ID or fail.
     */
    public function findById(int $id): ?User
    {
        return User::find($id);
    }
}
