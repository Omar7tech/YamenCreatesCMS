import { router } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import ContextMenu from '@/components/ContextMenu';
import Footer from '@/components/Footer';
import FooterIntro from '@/components/FooterIntro';
import Nav from '@/components/nav/Nav';

gsap.registerPlugin(ScrollTrigger);

function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    }
}

export default function Layout({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Handle hash on initial page load
        scrollToHash();

        // Handle hash after every Inertia navigation
        const remove = router.on('navigate', scrollToHash);
        return () => remove();
    }, []);

    useEffect(() => {
        // Refresh ScrollTrigger after fonts/images load
        const refreshScrollTrigger = () => {
            ScrollTrigger.refresh();
        };

        // Wait for fonts
        document.fonts.ready.then(refreshScrollTrigger);

        // Wait for images/full page load
        if (document.readyState === 'complete') {
            refreshScrollTrigger();
        } else {
            window.addEventListener('load', refreshScrollTrigger);
        }

        // Refresh after Inertia navigation
        const removeNavigate = router.on('navigate', () => {
            // Small delay to let new content render
            requestAnimationFrame(() => {
                requestAnimationFrame(refreshScrollTrigger);
            });
        });

        return () => {
            window.removeEventListener('load', refreshScrollTrigger);
            removeNavigate();
        };
    }, []);

    return (
        <>
            <a
                href="#main-content"
                className="sr-only rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
            >
                Skip to content
            </a>

            <header>
                <Nav />
            </header>

            <main id="main-content" className="min-h-screen pt-28 sm:pt-32">
                <article>{children}</article>
            </main>

            <FooterIntro />
            <Footer />
            <ContextMenu />
        </>
    );
}
