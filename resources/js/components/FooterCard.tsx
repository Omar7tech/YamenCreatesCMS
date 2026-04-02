import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type FooterCardProps = {
    children: ReactNode;
    title: string;
    href?: string;
    className?: string;
};

export default function FooterCard({
    children,
    title,
    href,
    className,
}: FooterCardProps) {
    return (
        <div
            className={`w-full rounded-3xl border-2 border-white/30 bg-white/5 p-5 text-left transition-all duration-500 ease-in-out ${className ?? ''}`}
        >
            {href ? (
                <Link href={href} className="block">
                    <h2 className="text-[clamp(3rem,4vw,4rem)] font-light">
                        {title}
                    </h2>
                </Link>
            ) : (
                <h2 className="text-[clamp(3rem,4vw,4rem)] font-light">
                    {title}
                </h2>
            )}

            {children}
        </div>
    );
}
