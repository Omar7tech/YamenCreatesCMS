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
            className="context-menu group relative"
        >
            <div
                aria-hidden
                className="absolute inset-0 rounded-[2.5rem] bg-purple-500/20 opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-60"
            />
            <div
                className="relative flex min-w-[200px] flex-col justify-between rounded-[2.5rem] border-2 border-transparent bg-[#262626] px-6 py-6 shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-200 ease-out [background:linear-gradient(#262626,#262626)_padding-box,linear-gradient(135deg,#d8b4fe_0%,#d8b4fe_25%,#a855f7_75%,#a855f7_100%)_border-box] group-hover:shadow-[0_4px_60px_rgba(168,85,247,0.55)]"
                style={{ left: position.x, top: position.y, position: 'fixed', zIndex: 9999 }}
            >
                <div className="mb-4">
                    <Link
                        href="/"
                        onClick={() => setIsVisible(false)}
                        className="transition-opacity hover:opacity-80"
                    >
                        <img src={logoPath} alt="Yamen Creates" className="h-6 w-auto" />
                    </Link>
                </div>

                <p className="mb-4 text-sm font-extralight italic leading-relaxed text-white/60">
                    {creativeLine}
                </p>

                <ul className="space-y-2 text-xl leading-none font-extralight text-white/80 uppercase">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/work', label: 'Work' },
                        { href: '/contact', label: 'Contact' },
                    ].map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setIsVisible(false)}
                                className="block transition-colors hover:text-white"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
