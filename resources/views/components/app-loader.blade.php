<!-- Branded Loading Screen - Set DISABLE_LOADER=true in .env to disable -->
@if(!env('DISABLE_LOADER', false))
<div id="app-loader" class="fixed inset-0 z-9999 flex items-center justify-center" style="background:#2b2b2b;">
    <div class="flex flex-col items-center gap-8">
        <img src="/logo/yamenlogo.svg" alt="Yamen Creates" class="h-8 w-auto opacity-0 translate-y-4 animate-[fadeInUp_0.6s_ease-out_forwards] md:h-10" />
        
        <!-- Creative Spinner -->
        <div class="relative h-5 w-5 opacity-0 animate-[fadeIn_0.4s_ease-out_0.3s_forwards] md:h-6 md:w-6">
            <div class="absolute inset-0 animate-[spin_1.5s_linear_infinite]">
                <div class="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/90 md:h-1.5 md:w-1.5"></div>
            </div>
            <div class="absolute inset-0 animate-[spin_1.5s_linear_infinite_0.3s]">
                <div class="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/60 md:h-1.5 md:w-1.5"></div>
            </div>
            <div class="absolute inset-0 animate-[spin_1.5s_linear_infinite_0.6s]">
                <div class="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/30 md:h-1.5 md:w-1.5"></div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
</style>

<script>
    window.addEventListener('load', () => {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.animation = 'fadeOut 0.4s ease-out forwards';
            setTimeout(() => loader.remove(), 400);
        }
    });
</script>
@endif
