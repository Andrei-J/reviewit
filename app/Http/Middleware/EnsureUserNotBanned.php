<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserNotBanned
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->isBanned()) {
            $user = $request->user();
            $banReason = $user->ban_reason;
            $bannedAt = $user->banned_at?->format('M d, Y');

            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')
                ->withErrors([
                    'email' => 'Your account has been suspended by an administrator. Please contact support.',
                ])
                ->with('banned_account', [
                    'reason' => $banReason,
                    'banned_at' => $bannedAt,
                    'email' => $user->email,
                ]);
        }

        return $next($request);
    }
}
