import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />

            <section className="flex min-h-[calc(100vh-7rem)] items-center px-5 md:px-10 lg:px-20">
                <div className="max-w-5xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/55">
                        Yamen Creates
                    </p>
                    <h1 className="font-special-gothic-expanded text-[clamp(3rem,11vw,8rem)] leading-none text-white">
                        Art, Strategy, and Storytelling.
                    </h1>
                    <p className="text-white/72 mt-6 max-w-2xl text-lg font-light sm:text-xl">
                        The Inertia shell now carries over the old
                        project&apos;s typography, palette, framing, and
                        navigation so the rest of the pages can be rebuilt on
                        the same visual system.
                    </p>
                </div>
            </section>
        </>
    );
}
