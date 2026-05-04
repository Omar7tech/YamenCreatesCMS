import type { ProjectSection } from '@/types/project';

interface TextOnlySectionProps {
    section: ProjectSection;
}

export default function TextOnlySection({ section }: TextOnlySectionProps) {
    return (
        <div className="py-12 md:py-16">
            {section.title && (
                <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                </h2>
            )}
            <div
                className="rich-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
        </div>
    );
}
