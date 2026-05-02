<!-- Branded Loading Screen - Set DISABLE_LOADER=true in .env to disable -->
@if(!env('DISABLE_LOADER', false))
<div id="app-loader">
    <div id="loader-content">
        <img src="/logo/yamenlogo.svg" alt="Yamen Creates" id="loader-logo" />

        <!-- Minimal Branded Spinner -->
        <svg id="loader-spinner" viewBox="0 0 50 50">
            <circle class="spinner-track" cx="25" cy="25" r="20"></circle>
            <circle class="spinner-progress" cx="25" cy="25" r="20"></circle>
        </svg>
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
        height: 1.75rem;
        width: auto;
        opacity: 0;
        animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1));
    }

    #loader-spinner {
        width: 48px;
        height: 48px;
        opacity: 0;
        animation: fadeIn 0.4s ease-out 0.2s forwards;
    }

    .spinner-track {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 2;
    }

    .spinner-progress {
        fill: none;
        stroke: rgba(255, 255, 255, 0.9);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 126;
        stroke-dashoffset: 126;
        transform-origin: center;
        animation: progress 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Responsive - slightly larger on desktop */
    @media (min-width: 768px) {
        #loader-logo {
            height: 2rem;
        }

        #loader-spinner {
            width: 52px;
            height: 52px;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes progress {
        0% {
            stroke-dashoffset: 126;
            transform: rotate(0deg);
        }
        50% {
            stroke-dashoffset: 32;
            transform: rotate(540deg);
        }
        100% {
            stroke-dashoffset: 126;
            transform: rotate(1080deg);
        }
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
