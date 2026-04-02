import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

import { index as contact } from '@/actions/App/Http/Controllers/ContactController';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import { index as work } from '@/actions/App/Http/Controllers/WorkController';
import DecryptedText from '@/components/DecryptedText';
import LoadingIndicator from '@/components/LoadingIndicator';

const logoPath = '/logo/yamenlogo.svg';

const navigationItems = [
    { name: 'Home', route: home() },
    { name: 'Work', route: work() },
    { name: 'Contact', route: contact() },
];

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => {
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, []);

    const containerVariants = useMemo(
        () => ({
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        }),
        [],
    );

    const itemVariants = useMemo(
        () => ({
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
        }),
        [],
    );

    const isActive = (targetUrl: string): boolean => {
        if (targetUrl === '/') {
            return url === '/';
        }

        return url.startsWith(targetUrl);
    };

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className="lg:px-15 fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[2000px] items-center justify-between gap-3 p-5 md:px-10"
        >
            <Link
                href={home()}
                aria-label="Go to homepage"
                className="group rounded-full border-2 border-white/[.145] bg-white/10 px-4 py-3 text-2xl font-light backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-100"
                viewTransition
            >
                <img
                    src={logoPath}
                    alt="Yamen Creates logo"
                    className="group-hover:brightness-20 w-[170px] transition-all duration-300 group-hover:grayscale sm:w-[220px]"
                />
            </Link>

            <ul className="hidden gap-3 sm:flex">
                {navigationItems.map((item) => (
                    <li key={item.route.url}>
                        <Link
                            href={item.route}
                            className={`rounded-full border-2 px-4 py-2 text-2xl font-light backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/5 hover:bg-white/10 hover:text-zinc-300 ${
                                isActive(item.route.url)
                                    ? 'border-white/20 bg-white/15 text-white'
                                    : 'border-white/[.145] bg-white/5 text-white/90'
                            }`}
                            viewTransition
                        >
                            <DecryptedText
                                text={item.name}
                                animateOn="hover"
                                speed={50}
                                revealDirection="start"
                                sequential
                                useOriginalCharsOnly={false}
                            />
                            <LoadingIndicator />
                        </Link>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="rounded-full border-2 border-white/[.145] bg-white/10 px-4 py-3 text-2xl font-light backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/5 hover:bg-white/10 hover:text-zinc-300 sm:hidden"
            >
                <motion.div
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </motion.div>
            </button>

            <AnimatePresence>
                {mobileMenuOpen ? (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            id="mobile-menu"
                            className="top-22 fixed left-1/2 z-50 flex h-fit w-[90%] -translate-x-1/2 flex-col space-y-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-md"
                            variants={containerVariants}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {navigationItems.map((item) => (
                                <motion.div
                                    key={item.route.url}
                                    variants={itemVariants}
                                >
                                    <Link
                                        href={item.route}
                                        className={`flex w-full justify-start rounded-full border-2 px-6 py-3 text-left text-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/5 hover:bg-white/20 hover:text-zinc-300 ${
                                            isActive(item.route.url)
                                                ? 'border-white/20 bg-white/20 text-white'
                                                : 'border-white/[.145] bg-white/10 text-white/90'
                                        }`}
                                        viewTransition
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <DecryptedText
                                            text={item.name}
                                            speed={50}
                                            revealDirection="start"
                                            sequential
                                            useOriginalCharsOnly={false}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>
        </nav>
    );
}
