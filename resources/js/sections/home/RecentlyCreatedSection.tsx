import { useState } from 'react';

interface RecentlyCreatedItem {
    id: number;
    image_1: string;
    image_2: string;
    image_3: string;
}

interface RecentlyCreatedSectionProps {
    items: RecentlyCreatedItem[];
}

const layout = [
    { imageKey: 'image_1' as const, colSpan: 'col-span-2 md:col-span-1' },
    { imageKey: 'image_2' as const, colSpan: 'col-span-2 md:col-span-1' },
    { imageKey: 'image_3' as const, colSpan: 'col-span-3 md:col-span-5' },
];

function ProjectTile({
    src,
    colSpan,
    alt,
    imageKey,
    loadedImages,
    handleImageLoad,
}: {
    src: string;
    colSpan: string;
    alt: string;
    imageKey: string;
    loadedImages: Set<string>;
    handleImageLoad: (key: string) => void;
}) {
    const isLoaded = loadedImages.has(imageKey);

    return (
        <div
            className={`${colSpan} relative h-[150px] overflow-hidden rounded-lg border border-white/[.145] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/50 hover:shadow-[0_8px_25px_rgba(147,51,234,0.3)] md:h-[320px] md:rounded-4xl`}
        >
            {!isLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                loading="lazy"
                onLoad={() => handleImageLoad(imageKey)}
            />
        </div>
    );
}

export default function RecentlyCreatedSection({ items }: RecentlyCreatedSectionProps) {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const handleImageLoad = (key: string) => {
        setLoadedImages((previous) => new Set(previous).add(key));
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="px-5 pt-8 md:px-10 md:pt-20 lg:px-20">
            <h2 className="mb-6 font-special-gothic-expanded text-[clamp(1rem,6vw,6rem)] leading-[0.95] font-extrabold uppercase">
                Recently Created
            </h2>

            <div className="grid grid-cols-7 gap-1 md:gap-3">
                {items.map((item) => (
                    layout.map(({ imageKey, colSpan }) => (
                        <ProjectTile
                            key={`${item.id}-${imageKey}`}
                            src={item[imageKey]}
                            colSpan={colSpan}
                            alt={`Recently created ${item.id}`}
                            imageKey={`${item.id}-${imageKey}`}
                            loadedImages={loadedImages}
                            handleImageLoad={handleImageLoad}
                        />
                    ))
                ))}
            </div>
        </section>
    );
}
