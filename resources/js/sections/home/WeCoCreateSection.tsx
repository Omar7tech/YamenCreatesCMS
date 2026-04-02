import Antigravity from '@/components/Antigravity';
import { motion } from 'motion/react';

export default function WeCoCreateSection() {
    return (
        <div className="relative mb-35 text-[clamp(1rem,20vw,20rem)] leading-[0.85] font-extralight">
            <motion.div
                className="hidden md:block"
                style={{ width: '100%', height: '400px', position: 'relative' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: '-100px' }}
            >
                <Antigravity
                    count={300}
                    magnetRadius={6}
                    ringRadius={7}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={1.5}
                    lerpSpeed={0.05}
                    color="#C82AFF"
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="sphere"
                    fieldStrength={10}
                />

                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-5 md:px-10 lg:px-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        viewport={{ once: true, margin: '-50px' }}
                        className="transform-gpu"
                    >
                        WeCo
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.9,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        viewport={{ once: true, margin: '-50px' }}
                        className="transform-gpu"
                    >
                        -Create <span className="text-white">®</span>
                    </motion.h2>
                </div>
            </motion.div>

            <div className="px-5 md:hidden md:px-10 lg:px-20">
                <motion.h2
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-30px' }}
                    className="transform-gpu"
                >
                    WeCo
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-30px' }}
                    className="transform-gpu"
                >
                    -Create <span className="text-white/50">®</span>
                </motion.h2>
            </div>
        </div>
    );
}
