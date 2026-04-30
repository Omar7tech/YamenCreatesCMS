import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const logoPath = '/logo/yamenlogo.svg';

const creativeLines = [
    "Right-clicked your way to greatness ✨",
    "Right click. Left impression.",
    "You right-clicked. We right-brain.",
    "Right click, right brand, right time.",
    "The right click was just the beginning.",
    "Right-clicked into YamenCreates' universe.",
    "Right click. Wrong place to be boring.",
    "You right-clicked. Now let's create.",
    "Right click energy. Left brain strategy.",
    "Right-clicked your way to YamenCreates.",
    "YamenCreates: Where right clicks become right choices.",
    "YamenCreates sees potential. Even in clicks.",
    "YamenCreates: Your brand's best friend.",
    "YamenCreates: Design that speaks louder.",
    "YamenCreates: Strategy wrapped in creativity.",
    "YamenCreates: Turning clicks into clients.",
    "Every brand has a story. What's yours?",
    "Design is thinking made visual.",
    "Where strategy meets creativity.",
    "Building brands that people remember.",
    "Click. Create. Captivate.",
    "Your brand, our canvas.",
    "Great design doesn't happen by accident.",
    "Turning ideas into iconic identities.",
    "Brands are made, not born.",
    "Every pixel tells a story.",
    "Strategy first. Design second. Magic always.",
    "Your vision, our expertise.",
    "Where brands come to life.",
    "Creative minds think differently.",
    "Design with purpose. Build with passion.",
    "Making the ordinary extraordinary.",
    "We don't just design. We transform.",
    "Your brand deserves to be unforgettable.",
    "From concept to cult following.",
    "We make brands people fall in love with.",
    "Design is the silent ambassador of your brand.",
    "Where creativity meets business logic.",
    "Branding that breaks the internet.",
    "Your competitors right-clicked too. But here you are.",
    "This menu took 0.3 seconds to design. Your brand? A lifetime.",
    "Right-clicked. Now let's get to work.",
    "A right click brought you here. A left brain will keep you.",
    "YamenCreates: Because brands don't build themselves.",
    "We turn 'maybe' into 'must have'.",
    "Your brand called. It wants a makeover.",
    "Right click. Right choice. Right now.",
    "YamenCreates: The brand whisperers.",
    "Some agencies design. YamenCreates defines.",
    "Right-clicked for a reason. Stay for the revolution.",
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

            <p className="mb-2 px-1 text-xs font-light italic leading-relaxed text-white/50">
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
