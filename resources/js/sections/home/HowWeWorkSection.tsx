export default function HowWeWorkSection() {
    return (
        <div className="px-5 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div
                    id="title-illustration"
                    className="grid h-full grid-rows-[auto_1fr]"
                >
                    <h1 className="font-special-gothic-expanded text-[clamp(1rem,7.5vw,6rem)] leading-none font-extrabold">
                        How <br className="hidden md:block" />
                        We Work
                    </h1>

                    <div className="flex min-h-0 items-center justify-center">
                        <img
                            src="/images/illustrations/illustration1.png"
                            alt="Illustration representing our structured approach to business growth"
                            width={300}
                            height={300}
                            className="transition-all duration-500 hover:scale-115 hover:shadow-purple-500/25 hover:drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div
                    id="paragraph"
                    className="space-y-5 text-[clamp(1.125rem,2.5vw,1.7rem)] leading-[1.2] font-extralight tracking-wide"
                >
                    <p>
                        At Yamen Creates, we work through four clearly defined
                        programs, each built around a specific business need.
                        Whether a company is starting, seeking structure,
                        repositioning, or preparing to scale, we activate the
                        right combination of strategy, marketing, content, and
                        digital systems to support that moment.
                    </p>
                    <p>
                        We don&apos;t begin with deliverables. We begin by
                        understanding where the business is, what is holding it
                        back, and what it needs next. From there, we apply a
                        program-led approach that brings clarity, alignment, and
                        direction ensuring every decision serves the business,
                        not just the brief.
                    </p>
                    <p>
                        Our role is not to execute in isolation, but to partner
                        closely with founders and leadership teams building
                        systems that carry the brand through growth, complexity,
                        and scale.
                    </p>
                </div>
            </div>
        </div>
    );
}
