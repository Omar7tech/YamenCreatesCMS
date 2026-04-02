import { ArrowRight } from 'lucide-react';

export default function FooterIntro() {
    return (
        <section className="flex h-screen items-center justify-center px-5 py-20 md:px-10 lg:px-20">
            <div>
                <div
                    id="footer-title"
                    className="text-[clamp(2rem,7vw,30rem)] font-bold leading-none"
                >
                    <p>All This, And It</p>
                    <p>Still Feels Unclear?</p>
                </div>

                <div className="flex flex-row gap-2 pt-5 text-sm md:gap-3 md:text-base">
                    <button className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6">
                        Find Your Program
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <button className="flex items-center justify-between gap-2 rounded-full border border-white/30 px-3 py-3 font-light text-white transition-all duration-300 hover:bg-white/10 md:px-6">
                        Let&apos;s Talk
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
