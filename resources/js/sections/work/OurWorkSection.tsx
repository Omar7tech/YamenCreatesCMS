import { router, Link } from '@inertiajs/react';
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
            <h1 className="font-special-gothic-expanded text-[clamp(1.5rem,11vw,15rem)] uppercase text-white">
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
    // Increased px-2 -> px-4 and py-1 -> py-1.5 for mobile
    // Increased md:px-2.5 -> md:px-5 and md:py-1.5 -> md:py-2 for desktop
    const btnClasses = "absolute right-2 top-2 z-30 inline-flex items-center justify-center cursor-pointer rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-light text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 md:right-4 md:top-4 md:px-6 md:py-2.5 md:text-xs";

    return (
        <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_12px_35px_rgba(147,51,234,0.4)] md:rounded-3xl">
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
                            className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
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
                            className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                            loading="lazy"
                            onLoad={onLoad}
                        />
                    )}
                </>
            ) : (
                <div className="h-full w-full bg-white/5" />
            )}

            {project.isInternal ? (
                <Link href={`/work/${project.slug}`} className={btnClasses}>
                    View More
                </Link>
            ) : (
                <a 
                    href={project.externalUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={btnClasses}
                >
                    View More
                </a>
            )}

            <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-purple-900/40 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}