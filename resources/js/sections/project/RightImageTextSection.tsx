import { motion } from 'motion/react';
import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface RightImageTextSectionProps {
    section: ProjectSection;
}

export default function RightImageTextSection({
    section,
}: RightImageTextSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="py-8 md:py-12"
        >
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center">
                    {section.title && (
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                            {section.title}
                        </h2>
                    )}
                    <div
                        className="rich-content prose prose-invert text-lg"
                        dangerouslySetInnerHTML={{ __html: section.content || '' }}
                    />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-lg md:rounded-3xl">
                    {section.image && (
                        <ImageWithLoader
                            src={section.image}
                            alt={section.title || 'Section image'}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
