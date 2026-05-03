@php
    $url = $getState();
    $qrCode = null;

    if (filled($url)) {
        try {
            $qrCode = \LaraZeus\Qr\Facades\Qr::render(data: $url, downloadable: false);
        } catch (\Exception $e) {
            $qrCode = null;
        }
    }
@endphp

@if($qrCode)
    <div class="flex justify-center items-center p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="qr-code-container">
            {!! $qrCode !!}
        </div>
    </div>
@endif
