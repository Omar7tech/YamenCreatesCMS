import SignatureProgramItem from '@/components/SignatureProgramItem';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import type { WorkProgramsSectionData } from '@/types/program';

interface ProgramsSectionProps {
    programsSection: WorkProgramsSectionData;
}

export default function ProgramsSection({
    programsSection,
}: ProgramsSectionProps) {
    if (programsSection.programs.length === 0) {
        return null;
    }

    const programsJsonLd = programsSection.programs.map((program) => ({
        '@context': 'https://schema.org',
        '@type': ['Service', 'CreativeWork'],
        '@id': `https://yamencreates.com/work#${program.id}`,
        name: program.title,
        description:
            `${program.description} ${program.bulletPoints.join('. ')}`.trim(),
        provider: {
            '@type': 'Organization',
            name: 'Yamen Creates',
            url: 'https://yamencreates.com',
            sameAs: [
                'https://www.instagram.com/yamencreates/',
                'https://www.linkedin.com/company/yamen-creates/',
            ],
        },
        serviceType: program.tags.join(', '),
        keywords: program.tags.join(', '),
        areaServed: 'Global',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${program.title} Services`,
            itemListElement: program.tags.map((tag) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: tag,
                    description: `Part of ${program.title} program`,
                },
            })),
        },
        offers: {
            '@type': 'Offer',
            url: `https://yamencreates.com/work#${program.id}`,
            price: 'Contact for pricing',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '0',
            bestRating: '5',
            worstRating: '1',
        },
        additionalProperty: program.bulletPoints.map((point, index) => ({
            '@type': 'PropertyValue',
            name: `Feature ${index + 1}`,
            value: point,
            description: `Detail of program ${program.title}`,
        })),
        image: program.images.map((image) => ({
            '@type': 'ImageObject',
            url: image.src,
            caption: image.alt,
            width: 400,
            height: 400,
        })),
        thumbnailUrl: program.images[0]?.src ?? null,
        potentialAction: {
            '@type': 'Action',
            name: program.buttonText,
            target: `https://yamencreates.com/work#${program.id}`,
        },
        url: `https://yamencreates.com/work#${program.id}`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://yamencreates.com/work#${program.id}`,
        },
    }));

    return (
        <div className="px-5 md:px-10 lg:px-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(programsJsonLd),
                }}
            />

            <h1 className="text-[clamp(1.5rem,4vw,3rem)]">
                {programsSection.sectionTitle}
            </h1>

            <div className="mt-8">
                <Accordion type="multiple">
                    {programsSection.programs.map((program) => (
                        <AccordionItem key={program.id} value={program.id}>
                            <AccordionTrigger
                                className="font-special-gothic-expanded text-[clamp(1.2rem,4.2vw,4rem)] leading-none  uppercase"
                                style={{
                                    fontSize: 'clamp(1.2rem, 4.2vw, 4rem)',
                                    lineHeight: 0.95,
                                    fontWeight: 500,
                                }}
                            >
                                {program.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <SignatureProgramItem program={program} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
