import { motion } from 'motion/react';
import { useState } from 'react';

const beliefParagraphs = [
    'We believe every business starts with an idea, but only becomes a brand through clarity, structure, and intent.',
    'Our role is to transform raw concepts into market-ready businesses by aligning strategy with human behavior, and translating ideas into brand, marketing, content, and digital systems built to perform through growth, complexity, and scale.',
    'Through program-led brand strategy, identity systems, content direction, and web infrastructure, we partner with founders and leadership teams to build brands that connect emotionally, operate commercially, and endure over time.',
];

const creativeTooltips = [
    "YamenCreates: Ideas in a jar.",
    "Your brand's secret weapon.",
    "Strategy, preserved.",
    "Fresh ideas. Daily.",
    "YamenCreates sees you.",
    "Brilliance loading...",
    "Your next aha moment.",
    "Ideas worth spreading.",
    "YamenCreates approved.",
    "The spark before the fire.",
];

export default function WeBelieveSection() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        setTooltipText(creativeTooltips[Math.floor(Math.random() * creativeTooltips.length)]);
        setShowTooltip(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section className="px-5 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex items-center justify-between gap-4 md:grid md:grid-rows-[auto_1fr] md:gap-0">
                    <motion.h2
                        className="font-special-gothic-expanded text-[clamp(6rem,12vw,15rem)] leading-[0.82] font-extrabold"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        WE
                    </motion.h2>

                    <motion.div
                        className="flex min-h-0 items-center md:hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: 'easeOut',
                        }}
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <img
                            src="/images/illustrations/jam.png"
                            alt="Jam jar illustration representing creativity and ideas"
                            className="w-[100px] transition-all duration-500 hover:scale-110"
                        />
                    </motion.div>

                    <motion.div
                        className="hidden min-h-0 items-center justify-center md:flex"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: 'easeOut',
                        }}
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <img
                            src="/images/illustrations/illustration2.png"
                            alt="Abstract illustration of business transformation and growth"
                            className="w-[300px] cursor-pointer transition-all duration-500 hover:scale-110"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={() => setShowTooltip(false)}
                            onMouseMove={handleMouseMove}
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="space-y-5 text-[clamp(1.125rem,2.5vw,1.875rem)] leading-[1.2] font-extralight tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {beliefParagraphs.map((paragraph, index) => (
                        <motion.p
                            key={paragraph}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4 + index * 0.1,
                                ease: 'easeOut',
                            }}
                            viewport={{ once: true, margin: '-30px' }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.div>
            </div>

            {/* Creative Tooltip */}
            {showTooltip && (
                <motion.div
                    className="pointer-events-none fixed z-9999 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-sm font-light text-white backdrop-blur-xl"
                    style={{ left: tooltipPos.x + 15, top: tooltipPos.y - 30 }}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    {tooltipText}
                </motion.div>
            )}
        </section>
    );
}
