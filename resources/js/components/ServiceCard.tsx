"use client";

import gsap from "gsap";
import { useRef } from "react";

type ServiceCardProps = {
    index: string;
    title: string;
    items: string[];
};

export default function ServiceCard({ index, title, items }: ServiceCardProps) {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const handleMouseEnter = () => {
        gsap.fromTo(
            titleRef.current,
            { x: 0 },
            {
                x: 8,
                duration: 0.4,
                ease: "power2.out",
            }
        );

        itemRefs.current.forEach((item, i) => {
            if (!item) {
return;
}

            gsap.fromTo(
                item,
                { x: 0, opacity: 0.8 },
                {
                    x: 6,
                    opacity: 1,
                    duration: 0.35,
                    delay: i * 0.06,
                    ease: "power2.out",
                }
            );
        });
    };

    const handleMouseLeave = () => {
        gsap.to(titleRef.current, {
            x: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });

        itemRefs.current.forEach((item, i) => {
            if (!item) {
return;
}

            gsap.to(item, {
                x: 0,
                opacity: 0.8,
                duration: 0.35,
                delay: i * 0.04,
                ease: "power2.inOut",
            });
        });
    };

    return (
        <div
            className="group relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                aria-hidden
                className="absolute inset-0 rounded-[2.5rem] bg-purple-500/20 opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-60"
            />
            <div className="relative flex min-h-fit flex-col justify-between rounded-[2.5rem] border-2 border-transparent bg-[#262626] px-10 py-14 shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-200 ease-out [background:linear-gradient(#262626,#262626)_padding-box,linear-gradient(135deg,#d8b4fe_0%,#d8b4fe_25%,#a855f7_75%,#a855f7_100%)_border-box] group-hover:-translate-y-1 group-hover:shadow-[0_4px_60px_rgba(168,85,247,0.55)]">
                <div className="flex items-start justify-between">
                    <h2
                        ref={titleRef}
                        className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-white"
                    >
                        {title}
                    </h2>
                    <span className="text-md mt-2 font-extralight text-white/70">
                        {index}
                    </span>
                </div>
                <ul className="text-xl leading-none font-extralight text-white/80 uppercase">
                    {items.map((item, i) => (
                        <li
                            key={item}
                            ref={(el) => {
 itemRefs.current[i] = el; 
}}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}