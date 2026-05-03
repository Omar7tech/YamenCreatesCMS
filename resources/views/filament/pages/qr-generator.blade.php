<x-filament-panels::page>
    <div class="space-y-6">
        <form wire:submit="save">
            {{ $this->form }}

            <div class="mt-6 flex justify-end gap-3">
                @foreach ($this->getFormActions() as $action)
                    {{ $action }}
                @endforeach
            </div>
        </form>
    </div>

    @script
    <script>
        $wire.on('download-qr', (event) => {
            const qrData = event.qrData;

            // Create a temporary element to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = qrData;

            // Find the SVG element
            const svg = temp.querySelector('svg');

            if (svg) {
                // Convert SVG to data URL
                const svgData = new XMLSerializer().serializeToString(svg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);

                // Create download link
                const downloadLink = document.createElement('a');
                downloadLink.href = svgUrl;
                downloadLink.download = 'qr-code.svg';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                // Clean up
                URL.revokeObjectURL(svgUrl);

                // Show success notification
                new FilamentNotification()
                    .title('QR Code downloaded successfully')
                    .success()
                    .send();
            }
        });
    </script>
    @endscript
</x-filament-panels::page>
