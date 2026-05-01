import { Link, usePage } from '@inertiajs/react';

import FooterCard from '@/components/FooterCard';

interface FooterCategory {
    name: string;
    slug: string;
}

interface SocialMediaItem {
    name: string;
    link: string;
}

const currentYear = new Date().getFullYear();

export default function Footer() {
    const { footerCategories, socialMedia } = usePage<{ footerCategories: FooterCategory[]; socialMedia: SocialMediaItem[] }>().props;
    return (
        <footer className="relative flex flex-col items-center justify-center space-y-5 px-5 text-center md:px-10 lg:px-40">
            <div>
                <p className="text-[clamp(2rem,4vw,5rem)] font-extralight">
                    WeCo-Create
                </p>
                <p className="text-[clamp(2rem,4vw,5rem)] font-extralight">
                    Strategic Brand &amp; Creative Partner
                </p>
            </div>

            <div className="mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                <FooterCard title="Home" href="/">
                    <ul className="overflow-auto pt-5 text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2]">
                        <li>
                            <Link
                                href="/#hero"
                                aria-label="Go to About Us section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#we-believe"
                                aria-label="Go to Our Philosophy section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Philosophy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#services"
                                aria-label="Go to Our Services section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#clients"
                                aria-label="Go to Our Clients section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Clients
                            </Link>
                        </li>
                    </ul>
                </FooterCard>

                <FooterCard title="Work" href="/work">
                    <ul className="overflow-auto pt-5 text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2]">
                        <li>
                            <Link
                                href="/work#programs"
                                aria-label="Go to Programs section on Work page"
                                className="transition-colors hover:text-white/80"
                            >
                                Programs
                            </Link>
                        </li>
                        {footerCategories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/work?category=${category.slug}#our-work`}
                                    aria-label={`Go to ${category.name} projects on Work page`}
                                    className="transition-colors hover:text-white/80"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </FooterCard>

                <FooterCard title="Contact" href="/contact">
                    <ul className="overflow-auto pt-5 text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2]">
                        <li>
                            <a
                                href="tel:+96170075077"
                                className="transition-colors hover:text-white/80"
                            >
                                +961 70 075 077
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:hello@yamencreates.com"
                                className="text-[clamp(1.5rem,1vw,1.6rem)] transition-colors hover:text-white/80"
                            >
                                hello@yamencreates.com
                            </a>
                        </li>
                        {socialMedia.map((item) => (
                            <li key={item.name}>
                                <a
                                    aria-label={`Visit Yamen Creates on ${item.name}`}
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-white/80"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </FooterCard>
            </div>

            <div className="py-5 font-extralight text-white/50">
                <p>
                    Copyright {currentYear} Yamen Creates. All rights reserved.
                </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[20px_20px] mask-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"></div>
            </div>
        </footer>
    );
}
