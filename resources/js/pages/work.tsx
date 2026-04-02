import { Head } from '@inertiajs/react';

export default function Work() {
    return (
        <>
            <Head title="Work" />

            <section className="flex min-h-[calc(100vh-7rem)] items-center px-5 md:px-10 lg:px-20">
                <div className="max-w-4xl rounded-[2rem] border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/55">
                        Work
                    </p>
                    <h1 className="mt-4 text-[clamp(3rem,8vw,6rem)] font-light leading-none text-white">
                        Program and project views can now inherit the old shell.
                    </h1>
                </div>
            </section>
        </>
    );
}
