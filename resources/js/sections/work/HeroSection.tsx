"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);
    const line3Ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- Heading: words drop in from above with blur ---
            if (headingRef.current) {
                const split = new SplitText(headingRef.current, { type: "words" });
                gsap.fromTo(
                    split.words,
                    {
                        y: -40,
                        opacity: 0,
                        filter: "blur(8px)",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }

            // --- Description lines: each word fades up with stagger ---
            const descLines = [line1Ref.current, line2Ref.current, line3Ref.current];
            descLines.forEach((line, li) => {
                if (!line) return;
                const split = new SplitText(line, { type: "words" });
                gsap.fromTo(
                    split.words,
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.06,
                        scrollTrigger: {
                            trigger: line,
                            start: "top 90%",
                            once: true,
                        },
                        delay: li * 0.1,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative px-5 md:px-10 lg:px-20">
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 bottom-0 h-full w-64 bg-[radial-gradient(ellipse_at_right,rgba(200,42,255,0.25),transparent_70%)] blur-[80px]"
            />
            <div className="relative space-y-5 leading-none">
                <div className="text-[clamp(2rem,8vw,9rem)] font-bold">
                    <h1 ref={headingRef}>
                        Work, Built Around
                        <br />
                        Business Stages.
                    </h1>
                </div>
                <div className="text-[clamp(1rem,4vw,2.5rem)] font-light">
                    <p ref={line1Ref}>See how we partner with leadership</p>
                    <p ref={line2Ref}>teams to build brands grounded in</p>
                    <p ref={line3Ref}>clarity and designed to scale.</p>
                </div>
            </div>
        </div>
    );
}