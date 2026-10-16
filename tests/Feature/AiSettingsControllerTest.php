<?php

use App\Models\User;
use Illuminate\Support\Facades\Http;

test('unauthenticated user cannot scan ollama models', function () {
    $response = $this->getJson(route('ai-settings.scan-ollama'));

    $response->assertUnauthorized();
});

test('unauthenticated user cannot update ai settings', function () {
    $response = $this->patchJson(route('ai-settings.update'), [
        'ai_provider' => 'local',
        'ai_model' => 'llama3',
    ]);

    $response->assertUnauthorized();
});

test('user can update ai settings with local provider', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->patchJson(route('ai-settings.update'), [
        'ai_provider' => 'local',
        'ai_model' => 'llama3:latest',
    ]);

    $response->assertOk()
        ->assertJson(['message' => 'AI settings saved.']);

    $user->refresh();
    expect($user->ai_provider)->toBe('local')
        ->and($user->ai_model)->toBe('llama3:latest');
});

test('user can update ai settings with cloud provider', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->patchJson(route('ai-settings.update'), [
        'ai_provider' => 'cloud',
        'cloud_ai_api_key' => 'sk-testkey123',
        'cloud_ai_base_url' => 'https://api.openai.com/v1',
    ]);

    $response->assertOk()
        ->assertJson(['message' => 'AI settings saved.']);

    $user->refresh();
    expect($user->ai_provider)->toBe('cloud')
        ->and($user->cloud_ai_api_key)->toBe('sk-testkey123')
        ->and($user->cloud_ai_base_url)->toBe('https://api.openai.com/v1');
});

test('scan ollama models handles successful ollama response', function () {
    Http::fake([
        'http://localhost:11434/api/tags' => Http::response([
            'models' => [
                ['name' => 'llama3:latest', 'size' => 4661224676, 'modified_at' => '2026-05-01T00:00:00Z'],
            ],
        ], 200),
    ]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route('ai-settings.scan-ollama'));

    $response->assertOk()
        ->assertJson([
            'available' => true,
            'models' => [
                ['name' => 'llama3:latest', 'size' => 4661224676],
            ],
        ]);
});

test('scan ollama models handles unreachable ollama service gracefully', function () {
    Http::fake([
        'http://localhost:11434/api/tags' => Http::response(null, 500),
    ]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route('ai-settings.scan-ollama'));

    $response->assertOk()
        ->assertJson([
            'available' => false,
            'models' => [],
        ]);
});
