<?php

namespace App\Services;

use Smalot\PdfParser\Parser;

class PdfTextExtractionService
{
    public function extractText(string $filePath): string
    {
        $parser = new Parser();

        $pdf = $parser->parseFile($filePath);

        return trim($pdf->getText());
    }
}
