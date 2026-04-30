import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const logoPath = '/logo/yamenlogo.svg';

const creativeLines = [
    // YamenCreates & right-click focused
    "YamenCreates sees potential. Even in clicks.",
    "YamenCreates finds inspiration. Even in right-clicks.",
    "YamenCreates discovers stories. Even in menus.",
    "Right-clicked. YamenCreates noticed.",
    "You right-clicked. YamenCreates right-brained.",
    "YamenCreates: Where right-clicks become right decisions.",
    "YamenCreates: Turning right-clicks into brand magic.",
    "You right-clicked. We right-designed.",
    "YamenCreates believes every click has potential.",
    "Right-clicked into YamenCreates' world. Welcome.",
    "YamenCreates: Because even clicks deserve design.",
    "You found the menu. YamenCreates finds the brand.",
    "YamenCreates sees a brand. Even in a click.",
    "Right click. YamenCreates. Right choice.",
    "YamenCreates: Where every click is a creative brief.",
    "Right-clicked for options. Found YamenCreates instead.",
    "YamenCreates: The right-click was just the start.",
    "Right-clicked. YamenCreates smiled.",
    "YamenCreates: Designing brands. Even on right-clicks.",
    "YamenCreates noticed your curiosity. We like that.",
    "YamenCreates: Your brand's secret weapon. One click away.",
    // Super creative & out of the box
    "Plot twist: This menu is your brand's horoscope.",
    "Spoiler: Your competitors use default menus.",
    "Fun fact: 0.01% right-click. You're special.",
    "Breaking: User discovers secret menu. Film at 11.",
    "Right-clicked into a plot twist nobody saw coming.",
    "Warning: Right-clicks may cause brand enlightenment.",
    "You could've left-clicked. But you didn't. Respect.",
    "This menu has seen things. Beautiful brand things.",
    "Diagnosis: Creative deficiency. We can help.",
    "This sentence changes. Like your brand should.",
    "Right-clicked. Universe aligned. YamenCreates appeared.",
    "Sponsored by: Your future iconic brand.",
    "Right-clicked into the matrix. Neo approved.",
    "Your cursor made a new friend. Say hi.",
    "Right-clicked. Loaded. Ready to disrupt.",
    "This menu is a metaphor. For what? Let's discuss.",
    "You found the Easter egg. The real treasure? Your brand.",
    "Right-clicked into the VIP section. No rope needed.",
    "100% organic, free-range creativity.",
    "Plot armor: +10. Brand awareness: Let's boost that.",
    "Right-clicked into the secret society of curious minds.",
    "Your right-click triggered our creative alarm.",
];

export default function ContextMenu() {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [creativeLine, setCreativeLine] = useState('');

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
            setCreativeLine(creativeLines[Math.floor(Math.random() * creativeLines.length)]);
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

            <p className="mb-2 px-1 text-sm font-light italic leading-relaxed text-white/50">
                {creativeLine}
            </p>

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
