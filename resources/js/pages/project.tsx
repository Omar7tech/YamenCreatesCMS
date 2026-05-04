import { Head } from '@inertiajs/react';

import ImageGallerySection from '@/sections/project/ImageGallerySection';
import LeftImageTextSection from '@/sections/project/LeftImageTextSection';
import RightImageTextSection from '@/sections/project/RightImageTextSection';
import TextOnlySection from '@/sections/project/TextOnlySection';
import type { ProjectDetail } from '@/types/project';

interface ProjectProps {
    project: ProjectDetail & {
        mediaType?: 'image' | 'video';
        mediaSrc?: string | null;
    };
}

export default function Project({ project }: ProjectProps) {
    const mediaSrc = project.mediaSrc || project.featuredImage;
    const isVideo = project.mediaType === 'video';

    return (
        <>
            <Head title={project.title} />

            <div className="px-5 md:px-10 lg:px-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 md:pt-12">
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 inline-flex">
                            <span className="text-sm font-medium tracking-wider uppercase text-purple-400">
                                {project.category.name}
                            </span>
                        </div>
                        <h1 className="font-special-gothic-expanded text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-extrabold uppercase">
                            {project.title}
                        </h1>
                    </div>

                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5 md:rounded-3xl">
                        {mediaSrc && (
                            isVideo ? (
                                <video
                                    src={mediaSrc}
                                    className="h-full w-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls={false}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={mediaSrc}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                            )
                        )}
                    </div>
                </div>

                {/* Sections */}
                <div className="mt-16 space-y-20 md:mt-24 md:space-y-32">
                    {project.sections.map((section) => {
                        switch (section.type) {
                            case 'text_only':
                                return (
                                    <TextOnlySection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'left_image_text':
                                return (
                                    <LeftImageTextSection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'right_image_text':
                                return (
                                    <RightImageTextSection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            case 'image_gallery':
                                return (
                                    <ImageGallerySection
                                        key={section.id}
                                        section={section}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </>
    );
}
