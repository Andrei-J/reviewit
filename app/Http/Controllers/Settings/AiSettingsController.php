<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;

class AiSettingsController extends Controller
{
    /**
     * Scan the local Ollama API and return available models.
     */
    public function scanOllamaModels(): JsonResponse
    {
        try {
            $response = Http::timeout(5)->get('http://localhost:11434/api/tags');

            if ($response->successful()) {
                $models = collect($response->json('models', []))
                    ->map(fn (array $m): array => [
                        'name' => $m['name'],
                        'size' => $m['size'] ?? null,
                        'modified_at' => $m['modified_at'] ?? null,
                    ])
                    ->values()
                    ->all();

                return response()->json([
                    'available' => true,
                    'models' => $models,
                ]);
            }

            return response()->json(['available' => false, 'models' => []]);
        } catch (\Exception) {
            return response()->json(['available' => false, 'models' => []]);
        }
    }

    /**
     * Persist the user's AI provider settings.
     *
     * @param  array{ai_provider: string, ai_model?: string, cloud_ai_api_key?: string, cloud_ai_base_url?: string}  $validated
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ai_provider' => ['required', Rule::in(['local', 'cloud'])],
            'ai_model' => ['nullable', 'string', 'max:255'],
            'cloud_ai_api_key' => ['nullable', 'string', 'max:512'],
            'cloud_ai_base_url' => ['nullable', 'url', 'max:512'],
        ]);

        $request->user()->update($validated);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'AI settings saved.']);
        }

        return back()->with('status', 'ai-settings-updated');
    }
}
