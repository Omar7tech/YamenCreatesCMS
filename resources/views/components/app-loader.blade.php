<!-- Branded Loading Screen - Set DISABLE_LOADER=true in .env to disable -->
@if(!env('DISABLE_LOADER', false))
<div id="app-loader">
    <div id="loader-content">
        <img src="/logo/yamenlogo.svg" alt="Yamen Creates" id="loader-logo" />

        <!-- Creative Spinner -->
        <div id="loader-spinner">
            <div class="spinner-ring spinner-ring-1">
                <div class="spinner-dot"></div>
            </div>
            <div class="spinner-ring spinner-ring-2">
                <div class="spinner-dot"></div>
            </div>
            <div class="spinner-ring spinner-ring-3">
                <div class="spinner-dot"></div>
            </div>
        </div>
    </div>
</div>

<style>
    #app-loader {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #2b2b2b;
    }

    #loader-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    #loader-logo {
        height: 2rem;
        width: auto;
        opacity: 0;
        transform: translateY(16px);
        animation: fadeInUp 0.6s ease-out forwards;
    }

    #loader-spinner {
        position: relative;
        height: 20px;
        width: 20px;
        opacity: 0;
        animation: fadeIn 0.4s ease-out 0.3s forwards;
    }

    .spinner-ring {
        position: absolute;
        inset: 0;
    }

    .spinner-ring-1 {
        animation: spin 1.5s linear infinite;
    }

    .spinner-ring-2 {
        animation: spin 1.5s linear infinite 0.3s;
    }

    .spinner-ring-3 {
        animation: spin 1.5s linear infinite 0.6s;
    }

    .spinner-dot {
        position: absolute;
        left: 50%;
        top: 0;
        height: 4px;
        width: 4px;
        transform: translateX(-50%);
        border-radius: 50%;
    }

    .spinner-ring-1 .spinner-dot {
        background: rgba(255, 255, 255, 0.9);
    }

    .spinner-ring-2 .spinner-dot {
        background: rgba(255, 255, 255, 0.6);
    }

    .spinner-ring-3 .spinner-dot {
        background: rgba(255, 255, 255, 0.3);
    }

    /* Responsive - larger on desktop */
    @media (min-width: 768px) {
        #loader-logo {
            height: 2.5rem;
        }

        #loader-spinner {
            height: 24px;
            width: 24px;
        }

        .spinner-dot {
            height: 6px;
            width: 6px;
        }
    }

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
