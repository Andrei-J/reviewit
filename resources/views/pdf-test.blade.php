
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ReviewIt PDF Test</title>
</head>
<body>
    <h1>Test PDF Text Extraction</h1>

    @if ($errors->any())
        <div style="color: #b91c1c; background: #fee2e2; border: 1px solid #f87171; padding: 12px; border-radius: 6px; margin-bottom: 16px; max-width: 500px;">
            <ul style="margin: 0; padding-left: 20px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('pdf.extract') }}"
        method="POST"
        enctype="multipart/form-data"
    >
        @csrf

        <input
            type="file"
            name="pdf"
            accept=".pdf,application/pdf"
            required
        >

        <button type="submit">Extract Text</button>
    </form>
</body>
</html>
