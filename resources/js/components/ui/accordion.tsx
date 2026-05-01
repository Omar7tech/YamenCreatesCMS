'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import gsap from 'gsap';

import { cn } from '@/lib/utils';

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn('border-b border-white/50 last:border-b-0', className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLSpanElement>(null);
    const arrowRef = React.useRef<SVGSVGElement>(null);
    const overlayTextRef = React.useRef<HTMLSpanElement>(null);
    const overlayArrowRef = React.useRef<SVGSVGElement>(null);

    const handleMouseEnter = () => {
        if (!overlayRef.current) return;

        gsap.to(overlayRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.6,
            ease: 'power3.inOut',
        });

        if (textRef.current) {
            gsap.to(textRef.current, {
                x: 8,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                x: -8,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (overlayTextRef.current) {
            gsap.to(overlayTextRef.current, {
                x: 8,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (overlayArrowRef.current) {
            gsap.to(overlayArrowRef.current, {
                x: -8,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }
    };

    const handleMouseLeave = () => {
        if (!overlayRef.current) return;

        gsap.to(overlayRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.6,
            ease: 'power3.inOut',
        });

        if (textRef.current) {
            gsap.to(textRef.current, {
                x: 0,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                x: 0,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (overlayTextRef.current) {
            gsap.to(overlayTextRef.current, {
                x: 0,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }

        if (overlayArrowRef.current) {
            gsap.to(overlayArrowRef.current, {
                x: 0,
                duration: 0.6,
                ease: 'power3.inOut',
            });
        }
    };

    return (
        <AccordionPrimitive.Header className="flex relative">
            <AccordionPrimitive.Trigger
                ref={triggerRef}
                data-slot="accordion-trigger"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 py-4 text-right transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 relative',
                    className,
                )}
                {...props}
            >
                <span ref={textRef} className="flex-1 text-left">{children}</span>
                <ChevronDownIcon ref={arrowRef} className="pointer-events-none size-10 shrink-0 translate-y-0.5 text-white/60 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
            <div
                ref={overlayRef}
                className={cn(
                    'absolute inset-0 bg-[#ededed] flex items-center justify-between gap-4 py-4 pointer-events-none overflow-hidden z-10',
                    className
                )}
                style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            >
                <span ref={overlayTextRef} className="flex-1 text-left text-[#2b2b2b]">{children}</span>
                <ChevronDownIcon ref={overlayArrowRef} className="size-10 shrink-0 translate-y-0.5 text-[#2b2b2b] transition-transform duration-200" />
            </div>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
            {...props}
        >
            <div className={cn('pt-0 pb-4', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
