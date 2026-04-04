'use client';

import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FooterIntro() {
    const { url } = usePage();
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) {
            return;
        }

        let ctx: gsap.Context | undefined;
        let frameId = 0;
        const splitInstances: SplitText[] = [];

        const init = () => {
            ctx = gsap.context(() => {
                if (line1Ref.current) {
                    const split = new SplitText(line1Ref.current, {
                        type: 'words',
                    });
                    splitInstances.push(split);

                    gsap.fromTo(
                        split.words,
                        { x: -30, opacity: 0, filter: 'blur(10px)' },
                        {
                            x: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            ease: 'none',
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 90%',
                                end: 'top 20%',
                                scrub: 1.2,
                            },
                        },
                    );
                }

                if (line2Ref.current) {
                    const split = new SplitText(line2Ref.current, {
                        type: 'words',
                    });
                    splitInstances.push(split);

                    gsap.fromTo(
                        split.words,
                        { x: 30, opacity: 0, filter: 'blur(10px)' },
                        {
                            x: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            ease: 'none',
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 80%',
                                end: 'top 10%',
                                scrub: 1.2,
                            },
                        },
                    );
                }

                if (buttonsRef.current) {
                    gsap.fromTo(
                        buttonsRef.current,
                        { y: 30, opacity: 0, filter: 'blur(6px)' },
                        {
                            y: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 60%',
                                end: 'top 0%',
                                scrub: 1.2,
                            },
                        },
                    );
                }

                ScrollTrigger.refresh();
            }, sectionRef);
        };

        frameId = requestAnimationFrame(() => {
            frameId = requestAnimationFrame(init);
        });

        return () => {
            cancelAnimationFrame(frameId);
            ctx?.revert();
            splitInstances.forEach((split) => split.revert());
        };
    }, [url]);

    return (
        <section
            ref={sectionRef}
            className="flex h-screen items-center justify-center px-5 py-20 md:px-10 lg:px-20"
        >
            <div>
                <div
                    id="footer-title"
                    className="text-[clamp(2rem,7vw,30rem)] leading-none font-bold"
                >
                    <p ref={line1Ref}>All This, And It</p>
                    <p ref={line2Ref}>Still Feels Unclear?</p>
                </div>
                <div
                    ref={buttonsRef}
                    className="flex flex-row gap-2 pt-5 text-sm md:gap-3 md:text-base"
                >
                    <button className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6">
                        Find Your Program
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6">
                        Let&apos;s Talk
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
