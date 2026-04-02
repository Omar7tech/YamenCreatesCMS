import OurBrandEquationSection from '@/sections/home/OurBrandEquationSection';
import RecentlyCreatedSection from '@/sections/home/RecentlyCreatedSection';
import HowWeWorkSection from '@/sections/home/HowWeWorkSection';
import ServicesSection from '@/sections/home/ServicesSection';
import WeCoCreateSection from '@/sections/home/WeCoCreateSection';
import HeroSection from '@/sections/home/HeroSection';
import WeBelieveSection from '@/sections/home/WeBelieveSection';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />

            <div className="space-y-20 md:space-y-32 lg:space-y-40">
                <HeroSection />
                <WeBelieveSection />
                <OurBrandEquationSection />
                <WeCoCreateSection />
                <HowWeWorkSection />
                <ServicesSection />
                <RecentlyCreatedSection />
            </div>
        </>
    );
}
