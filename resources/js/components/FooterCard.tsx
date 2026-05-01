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
            className={`group relative w-full rounded-3xl border-2 border-white/30 bg-white/5 p-5 text-left transition-all duration-300 ease-in-out hover:border-white/40 hover:bg-white/8 ${className ?? ''}`}
        >
            <div className="relative">
                {href ? (
                    <Link href={href} className="block">
                        <h2 className="text-[clamp(3rem,4vw,4rem)] font-light transition-all duration-200 group-hover:text-white/90 group-hover:translate-x-1">
                            {title}
                        </h2>
                    </Link>
                ) : (
                    <h2 className="text-[clamp(3rem,4vw,4rem)] font-light transition-colors duration-200 group-hover:text-white/90">
                        {title}
                    </h2>
                )}

                <div className="transition-all duration-200 group-hover:translate-y-[-1px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
