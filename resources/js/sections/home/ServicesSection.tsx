"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "@/components/ServiceCard";

gsap.registerPlugin(ScrollTrigger);

const services = [
    { index: "01", title: "BRND", items: ["Strategies", "Identities", "Designs"] },
    { index: "02", title: "MRKT", items: ["Products", "Markets", "Growth"] },
    { index: "03", title: "CTNT", items: ["Content", "Media", "Sales"] },
    { index: "04", title: "DVLP", items: ["Websites", "Interface", "Experience"] },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const glowRef1 = useRef<HTMLDivElement>(null);
    const glowRef2 = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let ctx: gsap.Context;

        const init = () => {
            ctx = gsap.context(() => {
                gsap.fromTo(glowRef1.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 90%",
                            end: "top 30%",
                            scrub: 1.5,
                        },
                    }
                );

                gsap.fromTo(glowRef2.current,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                            end: "top 25%",
                            scrub: 2,
                        },
                    }
                );

                cardsRef.current.forEach((card, i) => {
                    if (!card) return;
                    const isEven = i % 2 === 0;

                    gsap.fromTo(card,
                        {
                            y: isEven ? 50 : 70,
                            opacity: 0,
                            rotate: isEven ? -1.5 : 1.5,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            rotate: 0,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 100%",
                                end: "top 55%",
                                scrub: 1.2,
                            },
                        }
                    );
                });

                ScrollTrigger.refresh();
            }, sectionRef);
        };

        const timer = setTimeout(init, 100);

        return () => {
            clearTimeout(timer);
            ctx?.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-10">
            <div
                ref={glowRef1}
                aria-hidden
                className="pointer-events-none absolute inset-x-70 -top-64 -bottom-64 -left-40 bg-[radial-gradient(ellipse_at_center,rgba(200,42,255,0.50),transparent_70%)] blur-[120px]"
            />
            <div
                ref={glowRef2}
                aria-hidden
                className="pointer-events-none absolute inset-x-50 -top-40 -bottom-40 left-100 max-h-50 max-w-50 bg-[radial-gradient(ellipse_at_center,rgba(130,42,200,0.70),transparent_75%)] blur-[120px]"
            />
            <div className="relative mx-auto px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <ServiceCard
                                index={service.index}
                                title={service.title}
                                items={service.items}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}