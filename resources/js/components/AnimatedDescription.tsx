import { motion } from 'motion/react';

type AnimatedDescriptionProps = {
    text: string;
    delay?: number;
    className?: string;
};

export default function AnimatedDescription({
    text,
    delay = 0,
    className = '',
}: AnimatedDescriptionProps) {
    return (
        <motion.p
            className={`text-[clamp(1rem,4vw,1.5rem)] leading-none font-extralight text-white/70 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-50px' }}
        >
            {text}
        </motion.p>
    );
}
