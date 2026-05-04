import type { ProjectSection } from '@/types/project';

interface TextOnlySectionProps {
    section: ProjectSection;
}

export default function TextOnlySection({ section }: TextOnlySectionProps) {
    return (
        <div className="py-8 md:py-12">
            {section.title && (
                <h2 className="mb-6 text-2xl font-bold text-white md:text-4xl">
                    {section.title}
                </h2>
            )}
            <div
                className="rich-content prose prose-invert max-w-none text-lg md:w-3/4 md:text-xl lg:text-2xl"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
        </div>
    );
}
