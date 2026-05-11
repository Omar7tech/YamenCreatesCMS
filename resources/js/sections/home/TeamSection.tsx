import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

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
                        const roleAbbr = getRoleAbbreviation(member.position);

                        return (
                            <div
                                key={member.id}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className={`
                                    flex ${isCircleLeft ? 'flex-row' : 'flex-row-reverse'}
                                    items-center gap-3 md:gap-4 lg:gap-6
                                    p-px md:p-0.5 lg:p-1.5
                                    rounded-full
                                    transition-all duration-300
                                    group
                                `}
                                style={{
                                    border: '5px solid transparent',
                                    borderBottomWidth: '2px',
                                    backgroundImage: 'linear-gradient(#2B2B2B, #2B2B2B), linear-gradient(to bottom, rgba(244, 148, 254, 0.9) 0%, rgba(244, 148, 254, 0.85) 20%, rgba(244, 148, 254, 0.75) 30%, rgba(230, 180, 254, 0.6) 45%, rgba(240, 210, 254, 0.45) 55%, rgba(250, 230, 254, 0.3) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                }}
                            >
                                {/* Role Circle */}
                                <div className="flex-shrink-0">
                                    <div
                                        className="
                                            w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40
                                            rounded-full
                                            flex items-center justify-center
                                            transition-transform duration-200
                                        "
                                        style={{
                                            border: '3px solid transparent',
                                            backgroundImage: 'linear-gradient(#2B2B2B, #2B2B2B), linear-gradient(to bottom, rgba(244, 148, 254, 0.9) 0%, rgba(244, 148, 254, 0.85) 20%, rgba(244, 148, 254, 0.75) 30%, rgba(230, 180, 254, 0.6) 45%, rgba(240, 210, 254, 0.45) 55%, rgba(250, 230, 254, 0.3) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)',
                                            backgroundOrigin: 'border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            boxShadow: '5px 5px 16px rgba(0, 0, 0, 0.5)',
                                        }}
                                    >
                                        <span className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">
                                            {roleAbbr}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`flex flex-col justify-center min-w-0 flex-1 ${!isCircleLeft ? 'pl-4 md:pl-6 lg:pl-8' : ''}`}>
                                    <h3 className="text-xl md:text-2xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs md:text-sm lg:text-lg text-zinc-400 mt-1">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
