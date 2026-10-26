<?php

namespace App\Services;

use Smalot\PdfParser\Parser;

class PdfTextExtractionService
{
    public function extractText(string $filePath): string
    {
        $parser = new Parser;
        $pdf = $parser->parseFile($filePath);
        $text = $pdf->getText();

        // 1. Remove carriage returns
        $text = str_replace(["\r\n", "\r"], "\n", $text);

        // 2. Reduce 3+ consecutive newlines to just 2
        $text = preg_replace("/\n{3,}/", "\n\n", $text);

        return trim($text);
    }
}
