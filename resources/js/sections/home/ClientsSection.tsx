import LogoMarquee from '@/components/LogoMarquee';

interface ClientLogo {
    id: number;
    name: string;
    logo: string;
}

interface ClientsSectionProps {
    clients: ClientLogo[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
    if (!clients || clients.length === 0) {
return null;
}

    return (
        <div>
            <div className="px-5 md:px-10 lg:px-20 pt-10 md:pt-20">
                <h1 className="text-center uppercase font-special-gothic-expanded text-[clamp(1.1rem,5.5vw,6rem)] font-extrabold leading-[0.95] mb-10">
                    Clients & Co Creators
                </h1>
            </div>
            <LogoMarquee
                ariaLabel="Client logos"
                gapPx={48}
                durationSec={18}
                pauseOnHover
                items={clients.map((client) => ({
                    key: client.id,
                    node: (
                        <img
                            src={client.logo}
                            alt={client.name}
                            className="h-15 md:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            loading="lazy"
                        />
                    ),
                }))}
            />
        </div>
    );
}
