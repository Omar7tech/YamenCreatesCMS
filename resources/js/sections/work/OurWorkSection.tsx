import { router } from '@inertiajs/react';
import { useState } from 'react';

import { index } from '@/actions/App/Http/Controllers/WorkController';
import type { WorkCategory, WorkProject } from '@/types/project';

interface OurWorkSectionProps {
    categories: WorkCategory[];
    activeCategory: string;
    projects: WorkProject[];
}

export default function OurWorkSection({
    categories,
    activeCategory,
    projects,
}: OurWorkSectionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());

    if (categories.length === 0) return null;

    const handleCategoryChange = (slug: string) => {
        if (slug === activeCategory || isLoading) return;

        setIsLoading(true);
        router.visit(index.url({ query: { category: slug } }), {
            only: ['workProjects', 'workActiveCategory'],
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleMediaLoad = (id: string) => {
        setLoadedMedia((prev) => new Set(prev).add(id));
    };

    return (
        <div className="space-y-8 px-5 md:px-20 lg:px-40">
            <h1 className="font-special-gothic-expanded text-[clamp(1.5rem,11vw,15rem)] uppercase">
                Our Work
            </h1>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category.slug}
                        type="button"
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-light transition-all duration-300 hover:bg-white/10 md:px-4 md:py-2 md:text-sm ${
                            activeCategory === category.slug
                                ? 'border-gray-300 bg-gray-200 text-black'
                                : 'border-white/30 text-white'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                </div>
            ) : projects.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:gap-10">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            loaded={loadedMedia.has(project.id)}
                            onLoad={() => handleMediaLoad(project.id)}
                        />
                    ))}
                </div>
            ) : null}
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
