import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { index as contact } from '@/actions/App/Http/Controllers/ContactController';
import { index as work } from '@/actions/App/Http/Controllers/WorkController';
import AnimatedDescription from '@/components/AnimatedDescription';
import DecryptedText from '@/components/DecryptedText';
import MagneticButton from '@/components/MagneticButton';
import MagicBento from '@/components/MagicBento';

const heroLines = ['We Work With', 'Founders, CEOs,', '& Leadership Teams'];

const heroDescriptions = [
    'to define the core ideas behind their businesses, then build brand, marketing, content, and digital systems that carry them through growth, complexity, and scale.',
    "Yamen Creates is a strategic partner for businesses that don't want noise, they want direction, structure, and results.",
];

export default function HeroSection() {
    return (
        <div className="px-5 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-5 pt-1 md:grid-cols-2 md:pt-8">
                <div className="space-y-5">
                    <div>
                        <h1 className="text-[clamp(1.5rem,4vw,3.6rem)] leading-none font-bold">
                            <DecryptedText
                                text={heroLines[0]}
                                animateOn="view"
                                revealDirection="start"
                                sequential
                                useOriginalCharsOnly={false}
                            />
                        </h1>
                        <p className="text-[clamp(1.5rem,4vw,3.6rem)] leading-none font-bold">
                            <DecryptedText
                                text={heroLines[1]}
                                animateOn="view"
                                speed={60}
                                revealDirection="start"
                                sequential
                                useOriginalCharsOnly={false}
                            />
                        </p>
                        <p className="text-[clamp(1.5rem,4vw,3.6rem)] leading-none font-bold">
                            <DecryptedText
                                text={heroLines[2]}
                                animateOn="view"
                                revealDirection="start"
                                sequential
                                useOriginalCharsOnly={false}
                            />
                        </p>
                    </div>

                    <div className="max-w-[600px] space-y-5">
                        <AnimatedDescription
                            text={heroDescriptions[0]}
                            delay={0.2}
                        />
                        <AnimatedDescription
                            text={heroDescriptions[1]}
                            delay={0.4}
                        />

                        <div className="flex flex-row gap-2 pt-5 text-sm md:gap-3 md:text-base">
                            <Link
                                href={work()}
                                className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6"
                            >
                                Find Your Program
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <MagneticButton strength={0.4} className="inline-block">
                            <Link
                                href={contact()}
                                className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6"
                            >
                                Let&apos;s Talk
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </MagneticButton>
                        </div>
                    </div>
                </div>

                <div className="bento-grid">
                    <MagicBento
                        textAutoHide={false}
                        enableStars
                        enableSpotlight
                        enableBorderGlow
                        enableTilt
                        enableMagnetism={false}
                        clickEffect
                        spotlightRadius={400}
                        particleCount={12}
                        glowColor="139, 4, 250"
                        disableAnimations={false}
                    />
                </div>
            </div>

            <div className="flex items-end justify-end pt-10">
                <p className="text-4xl leading-none font-extralight tracking-wider uppercase">
                    (Scroll)
                </p>
            </div>
        </div>
    );
}
