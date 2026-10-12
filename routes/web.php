<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Student UI Routes (Frontend UI complete; ready for backend integration)
    Route::inertia('reviewers', 'reviewers/index')->name('reviewers.index');
    Route::inertia('reviewers/create', 'reviewers/create')->name('reviewers.create');
    Route::get('reviewers/{id}', function (string $id) {
        return inertia('reviewers/show', ['id' => $id]);
    })->name('reviewers.show');
    Route::inertia('subjects', 'reviewers/subjects')->name('subjects.index');
    Route::inertia('reports', 'reports/index')->name('reports.index');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/export', [UserController::class, 'export'])->name('users.export');
    Route::post('users/{user}/ban', [UserController::class, 'ban'])->name('users.ban');
    Route::post('users/{user}/unban', [UserController::class, 'unban'])->name('users.unban');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
