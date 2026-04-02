import { ArrowRight } from 'lucide-react';

import ImageWithLoader from '@/components/ImageWithLoader';
import type { WorkProgram } from '@/types/program';

interface SignatureProgramItemProps {
    program: WorkProgram;
}

export default function SignatureProgramItem({
    program,
}: SignatureProgramItemProps) {
    const whatsappUrl = `https://wa.me/96170075077?text=${encodeURIComponent(`I want to know more about ${program.title}`)}`;
    const callToActionUrl =
        program.buttonUrl && !program.buttonUrl.startsWith('#')
            ? program.buttonUrl
            : whatsappUrl;

    return (
        <div className="px-5 py-10">
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
                <div className="max-w-xl space-y-5 md:col-span-1">
                    <h1 className="text-[clamp(1.25rem,4vw,2.5rem)] leading-none font-bold">
                        {program.description}
                    </h1>

                    {program.hasCta ? (
                        <a
                            href={callToActionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-fit items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6"
                        >
                            {program.buttonText}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    ) : null}
                </div>

                <div className="text-[clamp(0.875rem,1.2vw,1.3rem)] font-extralight md:col-span-1">
                    <ul className="list-inside list-disc space-y-1 marker:text-xs md:space-y-2">
                        {program.bulletPoints.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 md:mt-15 md:gap-3">
                {program.tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-light text-white transition-all duration-300 hover:bg-white/10 md:px-4 md:py-2 md:text-sm"
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <ImageWithLoader images={program.images} />
        </div>
    );
}
