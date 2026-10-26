<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class AiReviewerService
{
    public function generateReviewer(
        User $user,
        string $extractedText,
        string $systemMessage,
        string $title,
        string $subject,
        ?string $overrideModel = null
    ): string {
        $userPrompt = <<<PROMPT
        Title: {$title}
        Subject: {$subject}

        --- SOURCE MATERIAL ---
        {$extractedText}
        --- END SOURCE MATERIAL ---

        Please generate a comprehensive, well-structured exam reviewer based on the source material above.
        Format using clean Markdown with:
        - Key Terms & Definitions
        - Core Concepts & Explanations
        - Formulas, Rules, or Step-by-Step Procedures (if any)
        - High-Yield Summary Takeaways
        PROMPT;

        $provider = $user->ai_provider ?? 'local';
        $selectedModel = $overrideModel ?: $user->ai_model;

        if ($provider === 'local') {
            return $this->generateWithOllama($systemMessage, $userPrompt, $selectedModel);
        }

        return $this->generateWithCloud($systemMessage, $userPrompt, $user, $selectedModel);
    }

    protected function generateWithOllama(string $systemMessage, string $prompt, ?string $model): string
    {
        $model = $model ?: 'llama3';

        $response = Http::timeout(600)->post('http://localhost:11434/api/chat', [
            'model' => $model,
            'stream' => false,
            'options' => [
                'temperature' => 0.6,
                'num_ctx' => 32768, // Allow up to 32k tokens so Ollama reads the entire document
            ],
            'messages' => [
                ['role' => 'system', 'content' => $systemMessage],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        if (! $response->successful()) {
            throw new RuntimeException('Ollama generation failed: '.($response->json('error') ?? $response->body()));
        }

        $content = $response->json('message.content');

        if (! $content) {
            throw new RuntimeException('Ollama returned an empty response.');
        }

        return trim($content);
    }

    protected function generateWithCloud(string $systemMessage, string $prompt, User $user, ?string $overrideModel = null): string
    {
        $baseUrl = rtrim($user->cloud_ai_base_url ?: 'https://api.openai.com/v1', '/');
        $model = $overrideModel ?: ($user->ai_model ?: 'gpt-4o-mini');

        if (! $user->cloud_ai_api_key) {
            throw new RuntimeException('Cloud AI API key is missing. Please configure it in your AI Settings.');
        }

        $response = Http::timeout(180)
            ->withToken($user->cloud_ai_api_key)
            ->post("{$baseUrl}/chat/completions", [
                'model' => $model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemMessage],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

        if (! $response->successful()) {
            $error = $response->json('error.message') ?? $response->body();
            throw new RuntimeException('Cloud AI request failed: '.$error);
        }

        $content = $response->json('choices.0.message.content');

        if (! $content) {
            throw new RuntimeException('Cloud AI returned an empty response.');
        }

        return trim($content);
    }
}
