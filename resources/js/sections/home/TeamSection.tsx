import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [toggledCards, setToggledCards] = useState<boolean[]>(
        new Array(team?.length || 0).fill(false)
    );

    const handleCardClick = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const textContent = card.querySelector('.text-content');
        const circle = card.querySelector('.circle-wrapper');
        if (!textContent || !circle) return;

        const isToggled = toggledCards[index];
        const isCircleLeft = index % 2 === 0;
        const currentDirection = isToggled ? !isCircleLeft : isCircleLeft;

        // Calculate movement distance
        const cardWidth = card.offsetWidth;
        const circleWidth = (circle as HTMLElement).offsetWidth;
        const gap = 24;
        const distance = cardWidth - circleWidth - (gap * 2);
        const moveDistance = currentDirection ? distance : -distance;

        const tl = gsap.timeline();

        // Fade out text
        tl.to(textContent, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
        });

        // Animate circle sliding to the other side
        tl.to(circle, {
            x: moveDistance,
            duration: 0.7,
            ease: 'power1.inOut'
        }, '-=0.15');

        // Change state (circle keeps x transform, maintaining visual position)
        tl.call(() => {
            setToggledCards((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
            });
        });

        // Minimal delay for DOM to settle
        tl.to({}, { duration: 0.02 });

        // Fade in text and clear circle transform simultaneously
        tl.to(textContent, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
            onStart: () => {
                gsap.set(circle, { clearProps: 'x' });
            }
        });
    };

    useEffect(() => {
        // Animations disabled
        return;
    }, [team]);

    if (!team || team.length === 0) return null;

    return (
        <div ref={sectionRef} className="px-5 md:px-10 lg:px-20 py-32">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground"
                    >
                        Creators
                    </h2>
                </div>

                {/* Cards */}
                <div className="space-y-6 md:space-y-8">
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
                                onClick={() => handleCardClick(index)}
                                className={`
                                    flex ${currentDirection ? 'flex-row' : 'flex-row-reverse'}
                                    items-center gap-3 md:gap-4 lg:gap-6
                                    p-px md:p-0.5 lg:p-1.5
                                    rounded-full
                                    transition-all duration-700 ease-in-out
                                    group
                                    cursor-pointer
                                `}
                                style={{
                                    border: '5px solid transparent',
                                    borderBottomWidth: '2px',
                                    backgroundImage: 'linear-gradient(#2B2B2B, #2B2B2B), linear-gradient(to bottom, rgba(244, 148, 254, 0.9) 0%, rgba(244, 148, 254, 0.85) 20%, rgba(244, 148, 254, 0.75) 30%, rgba(230, 180, 254, 0.6) 45%, rgba(240, 210, 254, 0.45) 55%, rgba(250, 230, 254, 0.3) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Role Circle */}
                                <div className="flex-shrink-0 circle-wrapper">
                                    <div
                                        className="
                                            w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40
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
                                        <span className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">
                                            {roleAbbr}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`flex flex-col justify-center min-w-0 flex-1 text-content ${!currentDirection ? 'pl-4 md:pl-6 lg:pl-8' : ''}`}>
                                    {!isToggled ? (
                                        <>
                                            <h3 className="text-xl md:text-2xl lg:text-5xl font-light text-white tracking-tight leading-tight uppercase">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs md:text-sm lg:text-lg text-zinc-400 mt-1">
                                                {member.position}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm md:text-base lg:text-xl text-zinc-300 leading-relaxed">
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
