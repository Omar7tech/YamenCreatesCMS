import { Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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

const mobilePanelRadius = '1.75rem';

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    useLayoutEffect(() => {
        const overlayElement = overlayRef.current;
        const panelElement = mobilePanelRef.current;
        const itemElements = mobileMenuItemRefs.current.filter(Boolean);

        if (!overlayElement || !panelElement) {
            return;
        }

        gsap.killTweensOf([overlayElement, panelElement, ...itemElements]);

        const timeline = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
        });

        if (mobileMenuOpen) {
            gsap.set(overlayElement, { pointerEvents: 'auto' });
            gsap.set(panelElement, { pointerEvents: 'auto' });

            timeline
                .fromTo(
                    overlayElement,
                    {
                        autoAlpha: 0,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.22,
                        ease: 'power2.out',
                    },
                    0,
                )
                .fromTo(
                    panelElement,
                    {
                        autoAlpha: 0,
                        y: -48,
                        scale: 0.88,
                        transformOrigin: 'top center',
                        clipPath: `inset(0 0 100% 0 round ${mobilePanelRadius})`,
                        filter: 'blur(16px)',
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        clipPath: `inset(0 0 0% 0 round ${mobilePanelRadius})`,
                        filter: 'blur(0px)',
                        duration: 0.56,
                        ease: 'expo.out',
                    },
                    0,
                )
                .fromTo(
                    itemElements,
                    {
                        autoAlpha: 0,
                        y: 26,
                        x: 0,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        x: 0,
                        stagger: 0.075,
                        duration: 0.42,
                        ease: 'power3.out',
                    },
                    0.18,
                );
        } else {
            timeline
                .to(itemElements.slice().reverse(), {
                    autoAlpha: 0,
                    y: 12,
                    stagger: 0.03,
                    duration: 0.12,
                    ease: 'power2.in',
                })
                .to(
                    panelElement,
                    {
                        autoAlpha: 0,
                        y: -28,
                        scale: 0.92,
                        clipPath: `inset(0 0 100% 0 round ${mobilePanelRadius})`,
                        filter: 'blur(12px)',
                        duration: 0.2,
                        ease: 'power2.inOut',
                    },
                    '-=0.04',
                )
                .to(
                    overlayElement,
                    {
                        autoAlpha: 0,
                        pointerEvents: 'none',
                        duration: 0.14,
                    },
                    '-=0.06',
                )
                .set(panelElement, {
                    pointerEvents: 'none',
                });
        }

        return () => {
            timeline.kill();
        };
    }, [mobileMenuOpen]);

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
                className="group relative z-[60] rounded-full border-2 border-white/[.145] bg-white/10 px-4 py-3 text-2xl font-light backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-100"
                viewTransition
                prefetch
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
                            prefetch
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
                className="relative z-60 sm:hidden rounded-full border border-white/15 bg-white/10 px-2 py-2 text-2xl font-light shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/30 hover:bg-white/14 hover:text-white"
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

            <>
                <div
                    ref={overlayRef}
                    className="pointer-events-none fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] sm:hidden"
                    style={{ opacity: 0, visibility: 'hidden' }}
                    onClick={() => setMobileMenuOpen(false)}
                />

                <div
                    id="mobile-menu"
                    ref={mobilePanelRef}
                    className="pointer-events-none fixed inset-x-4 top-22 z-50 overflow-hidden rounded-[1.75rem] border-2 border-white/[.145] bg-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:hidden"
                    style={{
                        opacity: 0,
                        visibility: 'hidden',
                        transform: 'translateY(-48px) scale(0.88)',
                        transformOrigin: 'top center',
                        clipPath: `inset(0 0 100% 0 round ${mobilePanelRadius})`,
                        filter: 'blur(16px)',
                    }}
                    onClick={(event) => event.stopPropagation()}
                >
                    <ul className="divide-y divide-white/8">
                        {navigationItems.map((item, index) => (
                            <li
                                key={item.route.url}
                                ref={(element) =>
                                    setMobileMenuItemRef(element, index)
                                }
                                style={{
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transform: 'translateY(26px)',
                                }}
                            >
                                <Link
                                    href={item.route}
                                    className={`group flex items-center justify-between py-5 text-left transition-all duration-300 ${
                                        isActive(item.route.url)
                                            ? 'text-white'
                                            : 'text-white/70 hover:text-white'
                                    }`}
                                    viewTransition
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div
                                        className={`text-[clamp(2rem,8vw,3.25rem)] leading-none font-light uppercase transition-all duration-300 ${
                                            isActive(item.route.url)
                                                ? 'tracking-[0.16em]'
                                                : 'tracking-[0.12em] group-hover:tracking-[0.16em]'
                                        }`}
                                    >
                                        {item.name}
                                    </div>

                                    <span
                                        className={`text-xs uppercase transition-all duration-300 ${
                                            isActive(item.route.url)
                                                ? 'translate-x-0 text-white/70 tracking-[0.28em]'
                                                : 'translate-x-0.5 text-white/35 tracking-[0.22em] group-hover:translate-x-0 group-hover:text-white/55'
                                        }`}
                                    >
                                        0{index + 1}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        </nav>
    );
}
