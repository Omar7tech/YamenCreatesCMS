import { useState } from 'react';

import type { OurWorkData, WorkProject } from '@/types/project';

interface OurWorkSectionProps {
    ourWork: OurWorkData;
}

export default function OurWorkSection({ ourWork }: OurWorkSectionProps) {
    const [activeCategory, setActiveCategory] = useState<number>(
        ourWork.categories[0]?.id ?? 0,
    );
    const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());

    if (ourWork.categories.length === 0) {
        return null;
    }

    const activeCategoryData = ourWork.categories.find(
        (cat) => cat.id === activeCategory,
    );
    const projects = activeCategoryData?.projects ?? [];

    const handleMediaLoad = (id: string) => {
        setLoadedMedia((prev) => new Set(prev).add(id));
    };

    const handleCategoryChange = (id: number) => {
        setLoadedMedia(new Set());
        setActiveCategory(id);
    };

    return (
        <div className="space-y-8 px-5 md:px-20 lg:px-40">
            <h1 className="font-special-gothic-expanded text-[clamp(1.5rem,11vw,15rem)] uppercase">
                Our Work
            </h1>

            <div className="flex flex-wrap gap-2">
                {ourWork.categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryChange(category.id)}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-light transition-all duration-300 hover:bg-white/10 md:px-4 md:py-2 md:text-sm ${
                            activeCategory === category.id
                                ? 'border-gray-300 bg-gray-200 text-black'
                                : 'border-white/30 text-white'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {projects.length > 0 && (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:gap-10">
                    {projects.map((project: WorkProject) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            loaded={loadedMedia.has(project.id)}
                            onLoad={() => handleMediaLoad(project.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface ProjectCardProps {
    project: WorkProject;
    loaded: boolean;
    onLoad: () => void;
}

function ProjectCard({ project, loaded, onLoad }: ProjectCardProps) {
    return (
        <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/20 md:rounded-3xl">
            {project.mediaSrc ? (
                <>
                    {!loaded && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        </div>
                    )}

                    {project.mediaType === 'video' ? (
                        <video
                            src={project.mediaSrc}
                            className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedData={onLoad}
                        />
                    ) : (
                        <img
                            src={project.mediaSrc}
                            alt={project.title}
                            className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onLoad={onLoad}
                        />
                    )}
                </>
            ) : (
                <div className="h-full w-full bg-white/5" />
            )}

<div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}
