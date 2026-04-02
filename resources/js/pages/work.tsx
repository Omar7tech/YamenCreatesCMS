import HeroSection from '@/sections/work/HeroSection';
import VideoSection from '@/sections/work/VideoSection';
import { Head } from '@inertiajs/react';

export default function Work() {
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
            </div>
        </>
    );
}
