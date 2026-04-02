import { motion } from 'motion/react';

export default function OurBrandEquationSection() {
    return (
        <section className="space-y-5 px-5 md:space-y-10 md:px-10 lg:px-20">
            <motion.h2
                className="text-center font-special-gothic-expanded text-[clamp(1rem,7.5vw,7rem)] leading-[0.95] font-extrabold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
            >
                Our Brand Equation
            </motion.h2>

            <motion.div
                className="equation-text rounded-full bg-white/5 px-5 py-4 md:py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-30px' }}
            >
                <motion.p
                    className="text-center text-[clamp(0.5rem,3.7vw,3.9rem)] leading-[1.2]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-20px' }}
                >
                    Art + Strategy + Psychology ={' '}
                    <span className="underline-curve relative inline-block">
                        Storytelling
                    </span>
                </motion.p>
            </motion.div>
        </section>
    );
}
