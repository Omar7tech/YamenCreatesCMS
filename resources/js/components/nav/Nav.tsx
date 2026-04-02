import { Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const { url } = usePage();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const mobilePanelRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuItemRefs = useRef<Array<HTMLLIElement | null>>([]);
    const mobileButtonIconRef = useRef<HTMLSpanElement | null>(null);

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

    useEffect(() => {
        if (mobileMenuOpen) {
            setMobileMenuVisible(true);
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (!mobileMenuVisible) {
            return;
        }

        const overlayElement = overlayRef.current;
        const panelElement = mobilePanelRef.current;
        const itemElements = mobileMenuItemRefs.current.filter(Boolean);

        if (!overlayElement || !panelElement) {
            return;
        }

        const timeline = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
            onComplete: () => {
                if (!mobileMenuOpen) {
                    setMobileMenuVisible(false);
                }
            },
        });

        if (mobileMenuOpen) {
            gsap.set(overlayElement, {
                opacity: 0,
            });
            gsap.set(panelElement, {
                opacity: 0,
                y: -20,
                scale: 0.96,
            });
            gsap.set(itemElements, {
                opacity: 0,
                y: 18,
            });

            timeline
                .to(overlayElement, {
                    opacity: 1,
                    duration: 0.22,
                })
                .to(
                    panelElement,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.36,
                    },
                    '-=0.08',
                )
                .to(
                    itemElements,
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.06,
                        duration: 0.28,
                    },
                    '-=0.18',
                );
        } else {
            timeline
                .to(itemElements.slice().reverse(), {
                    opacity: 0,
                    y: 12,
                    stagger: 0.04,
                    duration: 0.16,
                })
                .to(
                    panelElement,
                    {
                        opacity: 0,
                        y: -16,
                        scale: 0.98,
                        duration: 0.2,
                    },
                    '-=0.08',
                )
                .to(
                    overlayElement,
                    {
                        opacity: 0,
                        duration: 0.14,
                    },
                    '-=0.1',
                );
        }

        return () => {
            timeline.kill();
        };
    }, [mobileMenuOpen, mobileMenuVisible]);

    useEffect(() => {
        if (!mobileButtonIconRef.current) {
            return;
        }

        gsap.to(mobileButtonIconRef.current, {
            rotate: mobileMenuOpen ? 180 : 0,
            duration: 0.28,
            ease: 'power2.out',
        });
    }, [mobileMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const desktopMediaQuery = window.matchMedia('(min-width: 640px)');

        const syncMenuState = (event: MediaQueryList | MediaQueryListEvent) => {
            if (!event.matches) {
                return;
            }

            setMobileMenuOpen(false);
            setMobileMenuVisible(false);
            document.body.style.overflow = '';
        };

        syncMenuState(desktopMediaQuery);

        if (typeof desktopMediaQuery.addEventListener === 'function') {
            desktopMediaQuery.addEventListener('change', syncMenuState);

            return () => {
                desktopMediaQuery.removeEventListener('change', syncMenuState);
            };
        }

        desktopMediaQuery.addListener(syncMenuState);

        return () => {
            desktopMediaQuery.removeListener(syncMenuState);
        };
    }, []);

    const isActive = (targetUrl: string): boolean => {
        if (targetUrl === '/') {
            return url === '/';
        }

        return url.startsWith(targetUrl);
    };

    const setMobileMenuItemRef = (
        element: HTMLLIElement | null,
        index: number,
    ): void => {
        mobileMenuItemRefs.current[index] = element;
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
                className="sm:hidden rounded-full border border-white/15 bg-white/10 px-4 py-3 text-2xl font-light shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/30 hover:bg-white/14 hover:text-white"
            >
                <span
                    ref={mobileButtonIconRef}
                    className="flex items-center justify-center"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </span>
            </button>

            {mobileMenuVisible ? (
                <>
                    <div
                        ref={overlayRef}
                        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] sm:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div
                        id="mobile-menu"
                        ref={mobilePanelRef}
                        className="fixed inset-x-4 top-22 z-50 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="rounded-[1.5rem] border border-white/8 bg-black/12 p-2">
                            <div className="mb-3 flex items-center justify-between px-3 pt-2">
                                <p className="text-[0.72rem] font-medium tracking-[0.35em] text-white/45 uppercase">
                                    Menu
                                </p>
                                <span className="h-px w-10 bg-white/12" />
                            </div>

                            <ul className="space-y-2">
                                {navigationItems.map((item, index) => (
                                    <li
                                        key={item.route.url}
                                        ref={(element) =>
                                            setMobileMenuItemRef(element, index)
                                        }
                                    >
                                        <Link
                                            href={item.route}
                                            className={`group flex items-center justify-between rounded-[1.35rem] border px-5 py-4 text-left transition-all duration-300 ${
                                                isActive(item.route.url)
                                                    ? 'border-white/18 bg-white text-black'
                                                    : 'border-white/10 bg-white/[0.03] text-white hover:border-white/20 hover:bg-white/[0.08]'
                                            }`}
                                            viewTransition
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[1.15rem] font-medium tracking-[0.08em] uppercase">
                                                    {item.name}
                                                </span>
                                                <span
                                                    className={`text-[0.72rem] tracking-[0.28em] uppercase ${
                                                        isActive(item.route.url)
                                                            ? 'text-black/55'
                                                            : 'text-white/35'
                                                    }`}
                                                >
                                                    {isActive(item.route.url)
                                                        ? 'Current Page'
                                                        : 'Open Section'}
                                                </span>
                                            </div>

                                            <div
                                                className={`rounded-full border px-3 py-1 text-[0.68rem] tracking-[0.28em] uppercase transition-colors ${
                                                    isActive(item.route.url)
                                                        ? 'border-black/10 bg-black/5 text-black/70'
                                                        : 'border-white/10 text-white/45 group-hover:border-white/20 group-hover:text-white/75'
                                                }`}
                                            >
                                                0{index + 1}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ) : null}
        </nav>
    );
}
