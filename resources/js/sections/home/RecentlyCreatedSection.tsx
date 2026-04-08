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
}: {
    src: string;
    colSpan: string;
    alt: string;
}) {
    return (
        <div
            className={`${colSpan} relative h-[150px] overflow-hidden rounded-lg border border-white/[.145] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/50 hover:shadow-[0_8px_25px_rgba(147,51,234,0.3)] md:h-[320px] md:rounded-4xl`}
        >
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default function RecentlyCreatedSection({ items }: RecentlyCreatedSectionProps) {
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
                        />
                    ))
                ))}
            </div>
        </section>
    );
}
