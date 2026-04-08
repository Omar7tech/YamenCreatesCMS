import { Link } from '@inertiajs/react';

import FooterCard from '@/components/FooterCard';
import LoadingIndicator from '@/components/LoadingIndicator';

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center space-y-5 px-5 text-center md:px-10 lg:px-40">
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
                            <a
                                href="/#hero"
                                aria-label="Go to About Us section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#we-believe"
                                aria-label="Go to Our Philosophy section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Philosophy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#services"
                                aria-label="Go to Our Services section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#clients"
                                aria-label="Go to Our Clients section on Home page"
                                className="transition-colors hover:text-white/80"
                            >
                                Our Clients
                            </a>
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
                                <LoadingIndicator />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/work?category=Branding#our-work"
                                aria-label="Go to Branding Projects on Work page"
                                className="transition-colors hover:text-white/80"
                            >
                                Branding
                                <LoadingIndicator />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/work?category=Websites#our-work"
                                aria-label="Go to Website Projects on Work page"
                                className="transition-colors hover:text-white/80"
                            >
                                Websites
                                <LoadingIndicator />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/work?category=Content#our-work"
                                aria-label="Go to Content Projects on Work page"
                                className="transition-colors hover:text-white/80"
                            >
                                Content
                                <LoadingIndicator />
                            </Link>
                        </li>
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
                        <li>
                            <a
                                aria-label="Visit Yamen Creates on Instagram"
                                href="https://www.instagram.com/yamencreates/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-white/80"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                aria-label="Visit Yamen Creates on LinkedIn"
                                href="https://www.linkedin.com/company/yamen-creates/posts/?feedView=all"
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-white/80"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </FooterCard>
            </div>

            <div className="py-5 font-extralight text-white/50">
                <p>
                    Copyright {currentYear} Yamen Creates. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
