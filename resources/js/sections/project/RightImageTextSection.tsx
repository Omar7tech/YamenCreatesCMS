import ImageWithLoader from '@/components/ImageWithLoader';
import type { ProjectSection } from '@/types/project';

interface RightImageTextSectionProps {
    section: ProjectSection;
}

export default function RightImageTextSection({
    section,
}: RightImageTextSectionProps) {
    return (
        <div className="py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center">
                    {section.title && (
                        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                            {section.title}
                        </h2>
                    )}
                    <div
                        className="rich-content prose prose-invert"
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
        </div>
    );
}
