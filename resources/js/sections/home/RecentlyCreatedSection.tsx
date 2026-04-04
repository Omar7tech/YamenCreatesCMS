const projectData = [
    {
        id: 1,
        image: 'https://picsum.photos/seed/recent-1/1200/800',
        alt: 'Recently created placeholder 1',
    },
    {
        id: 2,
        image: 'https://picsum.photos/seed/recent-2/1200/800',
        alt: 'Recently created placeholder 2',
    },
    {
        id: 3,
        image: 'https://picsum.photos/seed/recent-3/1200/800',
        alt: 'Recently created placeholder 3',
    },
    {
        id: 4,
        image: 'https://picsum.photos/seed/business/1200/800',
        alt: 'Recently created placeholder 4',
    },
    {
        id: 5,
        image: 'https://picsum.photos/seed/recent-7/1200/800',
        alt: 'Recently created placeholder 5',
    },
    {
        id: 6,
        image: 'https://picsum.photos/seed/busins/1200/800',
        alt: 'Recently created placeholder 6',
    },
];

const layout = [
    { index: 0, colSpan: 'col-span-2 md:col-span-1' },
    { index: 1, colSpan: 'col-span-2 md:col-span-1' },
    { index: 2, colSpan: 'col-span-3 md:col-span-5' },
    { index: 5, colSpan: 'col-span-2 md:col-span-1' },
    { index: 4, colSpan: 'col-span-2 md:col-span-1' },
    { index: 3, colSpan: 'col-span-3 md:col-span-5' },
];

function ProjectTile({
    project,
    colSpan,
}: {
    project: (typeof projectData)[number];
    colSpan: string;
}) {
    return (
        <div
            className={`${colSpan} relative h-[150px] overflow-hidden rounded-lg border border-white/[.145] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/50 hover:shadow-[0_8px_25px_rgba(147,51,234,0.3)] md:h-[320px] md:rounded-4xl`}
        >
            <img
                src={project.image}
                alt={project.alt}
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default function RecentlyCreatedSection() {
    return (
        <section className="px-5 pt-8 md:px-10 md:pt-20 lg:px-20">
            <h2 className="mb-6 font-special-gothic-expanded text-[clamp(1rem,6vw,6rem)] leading-[0.95] font-extrabold uppercase">
                Recently Created
            </h2>

            <div className="grid grid-cols-7 gap-1 md:gap-3">
                {layout.map(({ index, colSpan }) => (
                    <ProjectTile
                        key={projectData[index].id}
                        project={projectData[index]}
                        colSpan={colSpan}
                    />
                ))}
            </div>
        </section>
    );
}
