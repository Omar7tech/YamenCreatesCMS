import { gsap, Flip, ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, Flip);

interface TeamMember {
    id: number;
    name: string;
    position: string;
    description?: string;
}

interface TeamSectionProps {
    team: TeamMember[];
}

/**
 * Extracts role abbreviation from position string
 * Examples: "Chief Executive Officer" → "CEO", "Software Engineer" → "SWE"
 */
function getRoleAbbreviation(position: string): string {
    const words = position.trim().split(/\s+/);

    if (words.length >= 2) {
        // Multi-word: take first letter of each word
        return words.map(word => word[0]).join('').toUpperCase();
    }

    // Single word: take first 2-3 letters
    return position.slice(0, 3).toUpperCase();
}

export default function TeamSection({ team }: TeamSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [toggledCards, setToggledCards] = useState<boolean[]>(
        new Array(team?.length || 0).fill(false)
    );
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleCardClick = (index: number) => {
        const card = cardsRef.current[index];

        if (!card) {
return;
}

        const textContent = card.querySelector('.text-content');
        const circle = card.querySelector('.circle-wrapper');

        if (!textContent || !circle) {
return;
}

        // Step 1: Fade out text
        gsap.to(textContent, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.inOut',
            onComplete: () => {
                // Step 2: Capture circle position before state change
                const state = Flip.getState(circle);

                // Step 3: Change React state (this changes flex-direction)
                setToggledCards((prev) => {
                    const newState = [...prev];
                    newState[index] = !newState[index];

                    return newState;
                });

                // Step 4: Wait for React to render, then animate circle
                requestAnimationFrame(() => {
                    Flip.from(state, {
                        duration: 0.6,
                        ease: 'power1.out',
                        onComplete: () => {
                            // Step 5: Fade in new text content
                            gsap.to(textContent, {
                                opacity: 1,
                                duration: 0.25,
                                ease: 'power2.inOut',
                            });
                        }
                    });
                });
            }
        });
    };

    useEffect(() => {
        // Animations disabled
        return;
    }, [team]);

    if (!team || team.length === 0) {
return null;
}

    return (
        <div ref={sectionRef} className="px-5 md:px-10 lg:px-20 py-32">
            <div className="max-w-4xl md:mx-auto">
                {/* Header */}
                <div className="mb-16 text-left md:text-center max-w-4xl md:mx-auto">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground"
                    >
                        Creators
                    </h2>
                </div>

                {/* Mobile Layout (Minimalist Editorial Stack) */}
                <div className="flex flex-col gap-12 md:hidden">
                    {team.map((member) => {
                        return (
                            <div key={member.id} className="flex flex-col space-y-3">
                                <div>
                                    <h3 className="text-4xl font-light text-white uppercase tracking-tight leading-none">
                                        {member.name}
                                    </h3>
                                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em] mt-2">
                                        {member.position}
                                    </p>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                                    {member.description || 'Creative professional contributing to the YamenCreates vision.'}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop Layout (Original Pill Design) */}
                <div className="hidden md:block space-y-6 md:space-y-8">
                    {team.map((member, index) => {
                        const isCircleLeft = index % 2 === 0;
                        const isToggled = toggledCards[index];
                        const roleAbbr = getRoleAbbreviation(member.position);
                        const currentDirection = isToggled ? !isCircleLeft : isCircleLeft;

                        return (
                            <div
                                key={member.id}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                {...(member.description && member.description.trim() ? { onClick: () => handleCardClick(index) } : {})}
                                onMouseMove={(e) => member.description && member.description.trim() && handleMouseMove(e, index)}
                                onMouseLeave={handleMouseLeave}
                                className={`
                                    flex md:flex-row ${currentDirection ? 'md:flex-row' : 'md:flex-row-reverse'}
                                    items-center gap-4 md:gap-4 lg:gap-6
                                    p-1 lg:p-1.5
                                    md:rounded-full
                                    transition-all duration-300 ease-out
                                    group
                                    relative
                                    hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]
                                    ${member.description && member.description.trim() ? 'cursor-pointer' : 'cursor-default'}
                                `}
                                style={{
                                    border: '5px solid transparent',
                                    borderBottomWidth: '2px',
                                    backgroundImage: 'linear-gradient(#2B2B2B, #2B2B2B), linear-gradient(to bottom, rgba(244, 148, 254, 0.9) 0%, rgba(244, 148, 254, 0.85) 20%, rgba(244, 148, 254, 0.75) 30%, rgba(230, 180, 254, 0.6) 45%, rgba(240, 210, 254, 0.45) 55%, rgba(250, 230, 254, 0.3) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                }}
                            >
                                {/* Tooltip - only show if description exists and card is hovered */}
                                {member.description && member.description.trim() && hoveredCard === index && (
                                    <div
                                        className="absolute bg-zinc-800/95 backdrop-blur-sm text-white text-xs md:text-sm px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap z-50 shadow-lg"
                                        style={{
                                            left: `${mousePos.x}px`,
                                            top: `${mousePos.y - 45}px`,
                                            transform: 'translateX(-50%)',
                                        }}
                                    >
                                        Click to know about {member.name}
                                    </div>
                                )}
                                {/* Role Circle */}
                                <div className="flex-shrink-0 circle-wrapper">
                                    <div
                                        className="
                                            w-28 h-28 lg:w-40 lg:h-40
                                            rounded-full
                                            flex items-center justify-center
                                        "
                                        style={{
                                            border: '3px solid transparent',
                                            backgroundImage: 'linear-gradient(#2B2B2B, #2B2B2B), linear-gradient(to bottom, rgba(244, 148, 254, 0.9) 0%, rgba(244, 148, 254, 0.85) 20%, rgba(244, 148, 254, 0.75) 30%, rgba(230, 180, 254, 0.6) 45%, rgba(240, 210, 254, 0.45) 55%, rgba(250, 230, 254, 0.3) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)',
                                            backgroundOrigin: 'border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            boxShadow: '5px 5px 16px rgba(0, 0, 0, 0.5)',
                                            willChange: 'transform',
                                        }}
                                    >
                                        <span className="text-3xl lg:text-5xl font-bold text-white">
                                            {roleAbbr}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`flex flex-col justify-center min-w-0 flex-1 text-content text-left px-6 md:px-10 lg:px-14 ${currentDirection ? 'md:pl-2 lg:pl-4' : 'md:pr-2 lg:pr-4'}`}>
                                    {!isToggled ? (
                                        <>
                                            <h3 className="text-2xl lg:text-6xl font-light text-white tracking-tight leading-none uppercase">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm lg:text-xl text-zinc-400 mt-1">
                                                {member.position}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm lg:text-xl text-zinc-300 leading-relaxed">
                                            {member.description || 'No description available'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
