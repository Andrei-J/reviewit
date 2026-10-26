<?php

namespace App\Http\Controllers;

use App\Services\AiReviewerService;
use App\Services\PdfTextExtractionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class ReviewerGenerationController extends Controller
{
    public function generate(
        Request $request,
        PdfTextExtractionService $pdfService,
        AiReviewerService $aiService
    ): JsonResponse {
        // Allow up to 10 minutes for full-document local LLM inference
        set_time_limit(600);
        ini_set('max_execution_time', '600');

        // 1. Validate inputs
        $request->validate([
            'pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'],
            'system_message' => ['nullable', 'string'],
            'title' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
        ]);

        try {
            $file = $request->file('pdf');

            // 2. Extract text from the PDF
            $extractedText = $pdfService->extractText($file->getRealPath());

            if (trim($extractedText) === '') {
                return response()->json([
                    'message' => 'No readable text was found in this PDF. Please ensure the document is not an image-only scan.',
                ], 422);
            }

            // 3. Fallbacks for optional fields
            $title = $request->input('title') ?: 'Exam Reviewer';
            $subject = $request->input('subject') ?: 'General Studies';
            $systemMessage = $request->input('system_message')
                ?: 'You are an expert academic tutor. Analyze the uploaded files and produce a structured, high-yield study reviewer.';
            $overrideModel = $request->input('model');

            // 4. Generate the reviewer via AI Service
            $reviewerMarkdown = $aiService->generateReviewer(
                user: $request->user(),
                extractedText: $extractedText,
                systemMessage: $systemMessage,
                title: $title,
                subject: $subject,
                overrideModel: $overrideModel
            );

            // 5. Return JSON to the browser
            return response()->json([
                'message' => 'Reviewer generated successfully.',
                'reviewer' => $reviewerMarkdown,
                'source_filename' => $file->getClientOriginalName(),
            ]);

        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => $e->getMessage() ?: 'Unable to generate reviewer. Please check your AI configuration.',
            ], 500);
        }
    }
}
