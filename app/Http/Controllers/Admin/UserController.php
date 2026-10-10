<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BanUserRequest;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class UserController extends Controller
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
        protected UserService $userService,
    ) {}

    /**
     * Display a listing of community users with stats and filters.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'search' => $request->query('search'),
            'status' => $request->query('status', 'all'),
            'plan' => $request->query('plan', 'all'),
            'sort' => $request->query('sort', 'newest'),
        ];

        $perPage = (int) $request->query('per_page', 10);
        if (! in_array($perPage, [10, 25, 50, 100], true)) {
            $perPage = 10;
        }

        $users = $this->userRepository->getPaginatedUsers($filters, $perPage);
        $stats = $this->userRepository->getCommunityStats();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $filters,
            'stats' => $stats,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Ban a user.
     */
    public function ban(BanUserRequest $request, User $user): RedirectResponse
    {
        if ($user->hasRole('admin')) {
            return back()->with('error', 'Administrator accounts cannot be banned.');
        }

        $this->userService->banUser(
            $user,
            $request->validated('reason'),
            $request->user(),
        );

        return back()->with('success', "{$user->name} has been banned.");
    }

    /**
     * Unban a user.
     */
    public function unban(Request $request, User $user): RedirectResponse
    {
        $this->userService->unbanUser($user);

        return back()->with('success', "{$user->name}'s platform access has been restored.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->hasRole('admin')) {
            return back()->with('error', 'Administrator accounts cannot be deleted.');
        }

        $name = $user->name;
        $this->userService->deleteUser($user);

        return back()->with('success', "User {$name} was deleted successfully.");
    }

    /**
     * Export users as CSV.
     */
    public function export(Request $request): StreamedResponse
    {
        $filters = [
            'status' => $request->query('status', 'all'),
            'plan' => $request->query('plan', 'all'),
        ];

        return $this->userService->exportUsers($filters);
    }
}
