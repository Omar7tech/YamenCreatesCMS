import { useState } from 'react';

import type { ProgramImage } from '@/types/program';

interface ImageWithLoaderProps {
    images: ProgramImage[];
}

export default function ImageWithLoader({ images }: ImageWithLoaderProps) {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const handleImageLoad = (index: number) => {
        setLoadedImages((previous) => new Set(previous).add(index));
    };

    const displayImages =
        images.length > 0
            ? images
            : Array.from({ length: 4 }, (_, index) => ({
                  src: '',
                  alt: `Program placeholder ${index + 1}`,
              }));

    return (
        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-10">
            {displayImages.map((image, index) => (
                <div
                    key={`${image.alt}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-lg border border-white/20 md:rounded-3xl"
                >
                    {image.src ? (
                        <>
                            {!loadedImages.has(index) && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                </div>
                            )}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                onLoad={() => handleImageLoad(index)}
                            />
                        </>
                    ) : (
                        <div className="h-full w-full bg-white/5" />
                    )}
                </div>
            ))}
        </div>
    );
}
