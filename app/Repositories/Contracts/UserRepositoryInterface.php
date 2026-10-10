<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
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
    public function getPaginatedUsers(array $filters = [], int $perPage = 10): LengthAwarePaginator;

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
    public function getCommunityStats(): array;

    /**
     * Find a user by ID or fail.
     */
    public function findById(int $id): ?User;
}
