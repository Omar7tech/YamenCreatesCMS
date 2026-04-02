import ServiceCard from '@/components/ServiceCard';
import { motion } from 'motion/react';

const services = [
    {
        index: '01',
        title: 'BRND',
        items: ['Strategies', 'Identities', 'Designs'],
    },
    {
        index: '02',
        title: 'MRKT',
        items: ['Products', 'Markets', 'Growth'],
    },
    {
        index: '03',
        title: 'CTNT',
        items: ['Content', 'Media', 'Sales'],
    },
    {
        index: '04',
        title: 'DVLP',
        items: ['Websites', 'Interface', 'Experience'],
    },
];

export default function ServicesSection() {
    return (
        <section className="relative pt-10">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-70 -top-64 -bottom-64 -left-40 bg-[radial-gradient(ellipse_at_center,rgba(200,42,255,0.50),transparent_70%)] blur-[120px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
            />

            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-50 -top-40 -bottom-40 left-100 max-h-50 max-w-50 bg-[radial-gradient(ellipse_at_center,rgba(130,42,200,0.70),transparent_75%)] blur-[120px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
            />

            <motion.div
                className="relative mx-auto px-5 md:px-10 lg:px-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1 + index * 0.1,
                                ease: 'easeOut',
                            }}
                            viewport={{ once: true, margin: '0px' }}
                        >
                            <ServiceCard
                                index={service.index}
                                title={service.title}
                                items={service.items}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
