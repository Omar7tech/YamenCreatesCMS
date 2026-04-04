"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HowWeWorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const para1Ref = useRef<HTMLParagraphElement>(null);
    const para2Ref = useRef<HTMLParagraphElement>(null);
    const para3Ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title
            if (titleRef.current) {
                const split = new SplitText(titleRef.current, { type: "chars,words" });
                gsap.set(split.chars, {
                    yPercent: 110,
                    opacity: 0,
                    rotateX: -40,
                    transformOrigin: "50% 100%",
                });
                gsap.to(split.chars, {
                    yPercent: 0,
                    opacity: 1,
                    rotateX: 0,
                    ease: "none",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 90%",
                        end: "top 30%",
                        scrub: 1,
                    },
                });
            }

            // Image
            gsap.fromTo(
                imgRef.current,
                { autoAlpha: 0, y: 50, scale: 0.92 },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imgRef.current,
                        start: "top 90%",
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            );

            // Paragraphs
            const paras = [para1Ref.current, para2Ref.current, para3Ref.current];
            paras.forEach((para) => {
                if (!para) return;

                new SplitText(para, { type: "lines", linesClass: "line-wrapper" });
                const split = new SplitText(para, { type: "lines" });

                gsap.set(split.lines, { yPercent: 105, opacity: 0 });

                gsap.to(split.lines, {
                    yPercent: 0,
                    opacity: 1,
                    ease: "none",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: para,
                        start: "top 90%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="px-5 md:px-10 lg:px-20">
            <style>{`.line-wrapper { overflow: hidden; display: block; }`}</style>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div
                    id="title-illustration"
                    className="grid h-full grid-rows-[auto_1fr]"
                >
                    <h1
                        ref={titleRef}
                        className="font-special-gothic-expanded text-[clamp(1rem,7.5vw,6rem)] leading-none font-extrabold overflow-hidden"
                        style={{ perspective: "600px" }}
                    >
                        How <br className="hidden md:block" />
                        We Work
                    </h1>
                    <div className="flex min-h-0 items-center justify-center">
                        <img
                            ref={imgRef}
                            src="/images/illustrations/illustration1.png"
                            alt="Illustration representing our structured approach to business growth"
                            width={300}
                            height={300}
                            className="transition-[transform,filter] duration-500 hover:scale-[1.15] hover:shadow-purple-500/25 hover:drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div
                    id="paragraph"
                    className="space-y-5 text-[clamp(1.125rem,2.5vw,1.7rem)] leading-[1.2] font-extralight tracking-wide"
                >
                    <p ref={para1Ref}>
                        At Yamen Creates, we work through four clearly defined
                        programs, each built around a specific business need.
                        Whether a company is starting, seeking structure,
                        repositioning, or preparing to scale, we activate the
                        right combination of strategy, marketing, content, and
                        digital systems to support that moment.
                    </p>
                    <p ref={para2Ref}>
                        We don&apos;t begin with deliverables. We begin by
                        understanding where the business is, what is holding it
                        back, and what it needs next. From there, we apply a
                        program-led approach that brings clarity, alignment, and
                        direction ensuring every decision serves the business,
                        not just the brief.
                    </p>
                    <p ref={para3Ref}>
                        Our role is not to execute in isolation, but to partner
                        closely with founders and leadership teams building
                        systems that carry the brand through growth, complexity,
                        and scale.
                    </p>
                </div>
            </div>
        </div>
    );
}