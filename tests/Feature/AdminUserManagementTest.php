<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);
});

test('non-admin users cannot access admin users page', function () {
    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)->get(route('admin.users.index'));

    $response->assertForbidden();
});

test('admin can access admin users page with stats and users', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $student = User::factory()->create(['plan' => 'premium']);
    $student->assignRole('student');

    $response = $this->actingAs($admin)->get(route('admin.users.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/users/index')
            ->has('users.data')
            ->has('stats')
            ->where('stats.premium', 1)
        );
});

test('admin can ban a student user with a reason', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($admin)->post(route('admin.users.ban', $student), [
        'reason' => 'Repeated community guideline violations',
    ]);

    $response->assertRedirect();
    $student->refresh();

    expect($student->isBanned())->toBeTrue()
        ->and($student->ban_reason)->toBe('Repeated community guideline violations')
        ->and($student->banned_by_id)->toBe($admin->id);
});

test('banned user is logged out and blocked by middleware', function () {
    $bannedUser = User::factory()->banned()->create();

    $response = $this->actingAs($bannedUser)->get(route('dashboard'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});

test('banned user login attempt fails with suspension error and session details', function () {
    $bannedUser = User::factory()->banned()->create([
        'password' => bcrypt('password123'),
        'ban_reason' => 'Academic integrity breach',
    ]);

    $response = $this->post(route('login'), [
        'email' => $bannedUser->email,
        'password' => 'password123',
    ]);

    $response->assertSessionHasErrors('email');
    $response->assertSessionHas('banned_account');
    $this->assertGuest();
});

test('admin can unban a banned user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $student = User::factory()->banned()->create();

    $response = $this->actingAs($admin)->post(route('admin.users.unban', $student));

    $response->assertRedirect();
    $student->refresh();

    expect($student->isBanned())->toBeFalse()
        ->and($student->ban_reason)->toBeNull()
        ->and($student->banned_by_id)->toBeNull();
});

test('admin can delete a student user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $student = User::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.users.destroy', $student));

    $response->assertRedirect();
    expect(User::find($student->id))->toBeNull();
});

test('admin cannot ban another admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $otherAdmin = User::factory()->create();
    $otherAdmin->assignRole('admin');

    $response = $this->actingAs($admin)->post(route('admin.users.ban', $otherAdmin), [
        'reason' => 'Trying to ban another admin',
    ]);

    $otherAdmin->refresh();
    expect($otherAdmin->isBanned())->toBeFalse();
});

test('admin can export users CSV', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('admin.users.export'));

    $response->assertOk();
    $response->assertHeader('content-type', 'text/csv; charset=UTF-8');
});
