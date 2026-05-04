import { motion } from 'motion/react';
import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface ImageGallerySectionProps {
    section: ProjectSection;
}

export default function ImageGallerySection({
    section,
}: ImageGallerySectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="py-8 md:py-12"
        >
            {section.title && (
                <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                </h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                {section.images?.map((image, index) => (
                    <div
                        key={`${section.id}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-lg md:rounded-2xl"
                    >
                        <ImageWithLoader
                            src={image}
                            alt={`${section.title || 'Gallery'} image ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
