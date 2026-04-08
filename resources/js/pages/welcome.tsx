import { Head } from '@inertiajs/react';

import HeroSection from '@/sections/home/HeroSection';
import HowWeWorkSection from '@/sections/home/HowWeWorkSection';
import OurBrandEquationSection from '@/sections/home/OurBrandEquationSection';
import RecentlyCreatedSection from '@/sections/home/RecentlyCreatedSection';
import ServicesSection from '@/sections/home/ServicesSection';
import WeBelieveSection from '@/sections/home/WeBelieveSection';
import WeCoCreateSection from '@/sections/home/WeCoCreateSection';

interface RecentlyCreatedItem {
    id: number;
    image_1: string;
    image_2: string;
    image_3: string;
}

interface WelcomeProps {
    recentlyCreated: RecentlyCreatedItem[];
}

export default function Welcome({ recentlyCreated }: WelcomeProps) {
    return (
        <>
            <Head title="Home" />

            <div className="space-y-20 md:space-y-32 lg:space-y-40">
                <section id="hero">
                    <HeroSection />
                </section>
                <section id="we-believe">
                    <WeBelieveSection />
                </section>
                <section id="brand-equation">
                    <OurBrandEquationSection />
                </section>
                <section id="co-create">
                    <WeCoCreateSection />
                </section>
                <section id="how-we-work">
                    <HowWeWorkSection />
                </section>
                <section id="services">
                    <ServicesSection />
                </section>
                <section id="clients">
                    <RecentlyCreatedSection items={recentlyCreated} />
                </section>
            </div>
        </>
    );
}
