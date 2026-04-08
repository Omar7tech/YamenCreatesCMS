import { Head } from '@inertiajs/react';

import HeroSection from '@/sections/work/HeroSection';
import OurWorkSection from '@/sections/work/OurWorkSection';
import ProgramsSection from '@/sections/work/ProgramsSection';
import VideoSection from '@/sections/work/VideoSection';
import type { WorkProgramsSectionData } from '@/types/program';

interface WorkProps {
    programsSection: WorkProgramsSectionData;
}

export default function Work({ programsSection }: WorkProps) {
    return (
        <>
            <Head title="Work" />

            <div className="space-y-8">
                <section id="hero" className="scroll-mt-32">
                    <HeroSection />
                </section>
                <section id="video" className="scroll-mt-32">
                    <VideoSection />
                </section>
                <section id="programs" className="scroll-mt-32">
                    <ProgramsSection programsSection={programsSection} />
                </section>
                <section id="our-work" className="scroll-mt-32">
                    <OurWorkSection />
                </section>
            </div>
        </>
    );
}
