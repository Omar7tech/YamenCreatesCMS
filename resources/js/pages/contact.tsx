import { Head, usePage } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';
import AnimatedDescription from '@/components/AnimatedDescription';

export default function Contact() {
    const { contactEmail, contactPhone } = usePage<{ 
        contactEmail: { email: string }[];
        contactPhone: { phone: string }[];
    }>().props;
    return (
        <>
            <Head title="Contact" />

            <div className=" space-y-20 px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="space-y-5">
                        <h1 className="text-[clamp(2rem,4vw,4rem)] leading-none font-bold">
                            Let&apos;s Create
                            <br />
                            Something Amazing
                        </h1>

                        <div className="max-w-[600px] space-y-5">
                            <AnimatedDescription
                                text="Ready to bring your vision to life? Whether you're a founder, CEO, or leadership team looking to build your brand, we're here to help."
                                delay={0.2}
                            />
                            <AnimatedDescription
                                text="Reach out to start a conversation about your project."
                                delay={0.4}
                            />
                        </div>

                        <div className="space-y-4 pt-5">
                            {contactEmail.map((item) => (
                                <div key={item.email} className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-white/70" />
                                    <a
                                        href={`mailto:${item.email}`}
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        {item.email}
                                    </a>
                                </div>
                            ))}
                            {contactPhone.map((item) => (
                                <div key={item.phone} className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-white/70" />
                                    <a
                                        href={`tel:${item.phone.replace(/\s/g, '')}`}
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        {item.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <form className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-white/80"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-white/80"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-white/80"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-light text-white transition-all duration-300 hover:bg-white/20"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
