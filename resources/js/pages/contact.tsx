import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />

            <section className="flex min-h-[calc(100vh-7rem)] items-center px-5 md:px-10 lg:px-20">
                <div className="max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/55">
                        Contact
                    </p>
                    <h1 className="mt-4 text-[clamp(3rem,8vw,6rem)] font-light leading-none text-white">
                        The contact page now sits inside the same branded frame
                        as the old site.
                    </h1>
                </div>
            </section>
        </>
    );
}
