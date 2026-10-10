<?php

namespace App\Repositories\Contracts;

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class UserService
{
    public function __construct(
        public UserRepositoryInterface $userRepository,
    ) {}

    /**
     * Ban a user, record the admin and reason, and terminate all active sessions.
     */
    public function banUser(User $user, string $reason, User $admin): void
    {
        $user->update([
            'banned_at' => now(),
            'ban_reason' => $reason,
            'banned_by_id' => $admin->id,
        ]);

        // Terminate any active web sessions immediately
        DB::table('sessions')->where('user_id', $user->id)->delete();
    }

    /**
     * Unban a user and restore platform access.
     */
    public function unbanUser(User $user): void
    {
        $user->update([
            'banned_at' => null,
            'ban_reason' => null,
            'banned_by_id' => null,
        ]);
    }

    /**
     * Soft delete a user and clear sessions.
     */
    public function deleteUser(User $user): void
    {
        DB::table('sessions')->where('user_id', $user->id)->delete();
        $user->delete();
    }

    /**
     * Export users as a downloadable CSV stream.
     *
     * @param  array{
     *     search?: string|null,
     *     status?: string|null,
     *     plan?: string|null,
     * }  $filters
     */
    public function exportUsers(array $filters = []): StreamedResponse
    {
        $filename = 'reviewit-users-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($filters) {
            $handle = fopen('php://output', 'w');

            // Header row
            fputcsv($handle, ['User ID', 'Name', 'Email', 'Plan', 'Status', 'Ban Reason', 'Joined Date']);

            // Fetch in chunks to preserve memory
            $query = User::query();

            if (! empty($filters['status']) && $filters['status'] !== 'all') {
                if ($filters['status'] === 'active') {
                    $query->whereNull('banned_at');
                } elseif ($filters['status'] === 'banned') {
                    $query->whereNotNull('banned_at');
                }
            }

            if (! empty($filters['plan']) && $filters['plan'] !== 'all') {
                $query->where('plan', $filters['plan']);
            }

            $query->orderBy('created_at', 'desc')->chunk(200, function ($users) use ($handle) {
                foreach ($users as $user) {
                    fputcsv($handle, [
                        $user->code,
                        $user->name,
                        $user->email,
                        ucfirst($user->plan),
                        ucfirst($user->status),
                        $user->ban_reason ?? '',
                        $user->created_at?->format('M j, Y') ?? '',
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}
