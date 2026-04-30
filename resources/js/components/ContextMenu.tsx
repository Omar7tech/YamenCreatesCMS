import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const logoPath = '/logo/yamenlogo.svg';

export default function ContextMenu() {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();

            const menuWidth = 180;
            const menuHeight = 200;
            const padding = 16;

            setPosition({
                x: e.clientX + menuWidth > window.innerWidth - padding
                    ? window.innerWidth - menuWidth - padding
                    : e.clientX,
                y: e.clientY + menuHeight > window.innerHeight - padding
                    ? window.innerHeight - menuHeight - padding
                    : e.clientY,
            });
            setIsVisible(true);
        };

        const close = () => setIsVisible(false);

        const handleClick = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.context-menu')) close();
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', (e) => e.key === 'Escape' && close());

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', close);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="context-menu fixed z-9999 min-w-[160px] rounded-2xl border border-white/15 bg-white/10 p-2 shadow-xl backdrop-blur-xl"
            style={{ left: position.x, top: position.y }}
        >
            <Link
                href="/"
                onClick={() => setIsVisible(false)}
                className="mb-2 block rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
            >
                <img src={logoPath} alt="Yamen Creates" className="h-8 w-auto" />
            </Link>

            <div className="mb-2 h-px bg-white/10" />

            <nav className="space-y-1">
                {[
                    { href: '/', label: 'Home' },
                    { href: '/work', label: 'Work' },
                    { href: '/contact', label: 'Contact' },
                ].map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsVisible(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-light text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
