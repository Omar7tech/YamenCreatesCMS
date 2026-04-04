'use client';

import { useState } from 'react';

const workData = {
    categories: [
        {
            name: 'Branding',
            items: [
                {
                    imageUrl: 'https://picsum.photos/seed/branding-1/400/400',
                    title: 'LeMah',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-2/400/400',
                    title: 'Stone House',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-3/400/400',
                    title: 'Better Bites',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-4/400/400',
                    title: 'Dalia Abi Husseib',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-5/400/400',
                    title: 'Do Lait',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-6/400/400',
                    title: 'Frame It',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-7/400/400',
                    title: 'Lebanese Roasters',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-8/400/400',
                    title: 'Real Estate Bts',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/branding-9/400/400',
                    title: 'Sero Tonin',
                },
            ],
        },
        {
            name: 'Content',
            items: [
                {
                    imageUrl: 'https://picsum.photos/seed/content-1/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-2/400/400',
                    title: 'Social Media Campaign',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-3/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-4/400/400',
                    title: 'Video Production',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-5/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-6/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-7/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-8/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-9/400/400',
                    title: 'Content Strategy',
                },
                {
                    imageUrl: 'https://picsum.photos/seed/content-10/400/400',
                    title: 'Content Strategy',
                },
            ],
        },
        {
            name: 'Websites',
            items: [
                {
                    imageUrl: 'https://picsum.photos/seed/website-1/400/400',
                    title: 'Portfolio Site',
                    link: {
                        url: 'https://example.com/portfolio-site',
                        title: 'View Project',
                    },
                },
                {
                    imageUrl: 'https://picsum.photos/seed/website-2/400/400',
                    title: 'E-commerce Platform',
                    link: {
                        url: 'https://example.com/ecommerce-platform',
                        title: 'View Project',
                    },
                },
                {
                    imageUrl: 'https://picsum.photos/seed/website-3/400/400',
                    title: 'Corporate Website',
                    link: {
                        url: 'https://example.com/corporate-website',
                        title: 'View Project',
                    },
                },
            ],
        },
    ],
};

interface WorkItem {
    imageUrl: string;
    title: string;
    link?: {
        url: string;
        title: string;
    };
}

export default function OurWorkSection() {
    const [activeCategory, setActiveCategory] = useState<string>(
        workData.categories[0]?.name || '',
    );
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    if (workData.categories.length === 0) {
        return null;
    }

    const categories = workData.categories.map((cat) => cat.name);

    const activeCategoryData = workData.categories.find(
        (cat) => cat.name === activeCategory,
    );
    const filteredItems = activeCategoryData?.items || [];

    const handleImageLoad = (imageUrl: string) => {
        setLoadedImages(new Set(loadedImages).add(imageUrl));
    };

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory) {
            setLoadedImages(new Set());
        } else {
            setLoadedImages(new Set());
            setActiveCategory(category);
        }
    };

    return (
        <div className="space-y-8 px-5 md:px-20 lg:px-40">
            <h1 className="font-special-gothic-expanded text-[clamp(1.5rem,11vw,15rem)] uppercase">
                Our Work
            </h1>

            <div id="filtering-tabs" className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryChange(category)}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-light transition-all duration-300 hover:bg-white/10 md:px-4 md:py-2 md:text-sm ${
                            activeCategory === category
                                ? 'border-gray-300 bg-gray-200 text-black'
                                : 'border-white/30 text-white'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div id="work-grid">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:gap-10">
                    {filteredItems.map((item: WorkItem, index: number) => (
                        <div
                            key={index}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-white/20 md:rounded-3xl"
                        >
                            {item.imageUrl && (
                                <>
                                    {!loadedImages.has(item.imageUrl) && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                        </div>
                                    )}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title || 'Work item'}
                                        className={`h-full w-full object-cover transition-all duration-300 ${
                                            loadedImages.has(item.imageUrl)
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                        onLoad={() => handleImageLoad(item.imageUrl)}
                                    />
                                </>
                            )}

                            {item.link && (
                                <a
                                    href={item.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-2 top-2 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 md:right-4 md:top-4"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {item.link.title}
                                </a>
                            )}

                            <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div>
                                    {item.title && (
                                        <h3 className="text-lg font-semibold text-white">
                                            {item.title}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
