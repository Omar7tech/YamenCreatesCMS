<!-- Branded Loading Screen - Set DISABLE_LOADER=true in .env to disable -->
@if(!env('DISABLE_LOADER', false))
<div id="app-loader" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#2b2b2b;">
    <div id="loader-content" style="display:flex;flex-direction:column;align-items:center;gap:2rem;">
        <img src="/logo/yamenlogo.svg" alt="Yamen Creates" id="loader-logo" style="height:1.75rem;width:auto;opacity:0;filter:drop-shadow(0 2px 8px rgba(255,255,255,0.1));" />

        <!-- Minimal Branded Spinner -->
        <svg id="loader-spinner" viewBox="0 0 50 50" style="width:48px;height:48px;opacity:0;">
            <circle class="spinner-track" cx="25" cy="25" r="20" style="fill:none;stroke:rgba(255,255,255,0.08);stroke-width:2;"></circle>
            <circle class="spinner-progress" cx="25" cy="25" r="20" style="fill:none;stroke:rgba(255,255,255,0.9);stroke-width:2;stroke-linecap:round;stroke-dasharray:126;stroke-dashoffset:126;transform-origin:center;"></circle>
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
    // Show loader IMMEDIATELY (works even if CSS not loaded)
    (function() {
        const logo = document.getElementById('loader-logo');
        const spinner = document.getElementById('loader-spinner');

        // Immediate visibility with JS animation (no CSS dependency)
        if (logo) {
            logo.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            logo.style.transform = 'translateY(12px)';
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, 50);
        }

        if (spinner) {
            spinner.style.transition = 'opacity 0.4s ease-out';
            setTimeout(() => {
                spinner.style.opacity = '1';
            }, 250);
        }
    })();

    // Remove loader when page fully loads with smooth animation
    window.addEventListener('load', () => {
        const loader = document.getElementById('app-loader');
        const content = document.getElementById('loader-content');

        if (loader && content) {
            // Animate content scale down + fade
            content.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.transform = 'scale(0.85)';
            content.style.opacity = '0';

            // Fade out background slightly after
            setTimeout(() => {
                loader.style.transition = 'opacity 0.3s ease-out';
                loader.style.opacity = '0';
            }, 200);

            // Remove from DOM
            setTimeout(() => loader.remove(), 600);
        }
    });
</script>
@endif
