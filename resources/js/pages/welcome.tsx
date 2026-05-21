import { Head } from '@inertiajs/react';

import ClientsSection from '@/sections/home/ClientsSection';
import HeroSection from '@/sections/home/HeroSection';
import HowWeWorkSection from '@/sections/home/HowWeWorkSection';
import OurBrandEquationSection from '@/sections/home/OurBrandEquationSection';
import RecentlyCreatedSection from '@/sections/home/RecentlyCreatedSection';
import ServicesSection from '@/sections/home/ServicesSection';
import TeamSection from '@/sections/home/TeamSection';
import WeBelieveSection from '@/sections/home/WeBelieveSection';
import WeCoCreateSection from '@/sections/home/WeCoCreateSection';

interface RecentlyCreatedItem {
    id: number;
    image_1: string;
    image_2: string;
    image_3: string;
}

interface ClientLogo {
    id: number;
    name: string;
    logo: string;
}

interface TeamMember {
    id: number;
    name: string;
    position: string;
    description?: string;
}

interface WelcomeProps {
    recentlyCreated: RecentlyCreatedItem[];
    clients: ClientLogo[];
    team: TeamMember[];
}

export default function Welcome({
    recentlyCreated,
    clients,
    team,
}: WelcomeProps) {
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
                <section id="recently-created">
                    <RecentlyCreatedSection items={recentlyCreated} />
                </section>
                <section id="how-we-work">
                    <HowWeWorkSection />
                </section>
                <section id="services">
                    <ServicesSection />
                </section>
                
                <section id="clients">
                    <ClientsSection clients={clients} />
                </section>
                <section id="team">
                    <TeamSection team={team} />
                </section>
            </div>
        </>
    );
}
