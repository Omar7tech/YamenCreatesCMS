import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import FooterIntro from '@/components/FooterIntro';
import Nav from '@/components/nav/Nav';

export default function Layout({ children }: { children: ReactNode }) {
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
        </>
    );
}
