<?php

namespace App\Http\Controllers;

use App\Services\PdfTextExtractionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class PdfExtractionController extends Controller
{
    public function extract(
        Request $request,
        PdfTextExtractionService $pdfService
    ): JsonResponse {
        $request->validate([
            'pdf' => [
                'required',
                'file',
                'mimes:pdf',
                'max:10240',
            ],
        ]);

        try {
            $file = $request->file('pdf');

            $text = $pdfService->extractText(
                $file->getRealPath()
            );

            if ($text === '') {
                return response()->json([
                    'message' => 'No readable text was found in this PDF.',
                ], 422);
            }

            return response()->json([
                'message' => 'PDF text extracted successfully.',
                'filename' => $file->getClientOriginalName(),
                'characters' => mb_strlen($text),
                'text' => $text,
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unable to extract text from this PDF.',
            ], 422);
        }
    }
}
