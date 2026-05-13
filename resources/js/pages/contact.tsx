import { Head, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedDescription from '@/components/AnimatedDescription';

const STORAGE_KEY = 'contact_submission_count';
const MAX_SUBMISSIONS = 2;

interface ValidationErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export default function Contact() {
    const { contactEmail, contactPhone } = usePage<{
        contactEmail: { email: string }[];
        contactPhone: { phone: string }[];
    }>().props;

    const [submissionCount, setSubmissionCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [frontendErrors, setFrontendErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        setSubmissionCount(count);
    }, []);

    const isLimitReached = submissionCount >= MAX_SUBMISSIONS;

    const validateForm = (formData: FormData): ValidationErrors => {
        const errors: ValidationErrors = {};
        const name = (formData.get('name') as string) || '';
        const email = (formData.get('email') as string) || '';
        const phone = (formData.get('phone') as string) || '';
        const message = (formData.get('message') as string) || '';

        if (!name.trim()) {
            errors.name = 'Please enter your name.';
        } else if (name.length > 255) {
            errors.name = 'Name cannot exceed 255 characters.';
        }

        if (!email && !phone) {
            errors.email = 'Please provide either an email or phone number.';
            errors.phone = 'Please provide either an email or phone number.';
        } else {
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.email = 'Please enter a valid email address.';
            } else if (email && email.length > 255) {
                errors.email = 'Email cannot exceed 255 characters.';
            }

            if (phone && !/^[0-9]+$/.test(phone)) {
                errors.phone = 'Phone number must contain only numbers.';
            } else if (phone && phone.length < 8) {
                errors.phone = 'Phone number must be at least 8 digits.';
            } else if (phone && phone.length > 50) {
                errors.phone = 'Phone cannot exceed 50 characters.';
            }
        }

        if (!message.trim()) {
            errors.message = 'Please enter a message.';
        } else if (message.length > 5000) {
            errors.message = 'Message cannot exceed 5000 characters.';
        }

        return errors;
    };

    const handleBeforeSubmit = (visit: any) => {
        const form = document.querySelector('form') as HTMLFormElement;
        if (!form) return true;

        const formData = new FormData(form);
        const errors = validateForm(formData);

        if (Object.keys(errors).length > 0) {
            setFrontendErrors(errors);
            return false;
        }

        setFrontendErrors({});
        return true;
    };

    const handleSuccess = () => {
        setShowSuccess(true);
        const newCount = submissionCount + 1;
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        setSubmissionCount(newCount);
    };

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
                        {showSuccess ? (
                            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 text-center backdrop-blur-sm md:p-8">
                                <div className="mb-4 flex justify-center">
                                    <CheckCircle className="h-12 w-12 text-purple-400 sm:h-14 sm:w-14" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
                                    Message Sent
                                </h3>
                                <p className="text-sm text-white/70 sm:text-base">
                                    We&apos;ll get back to you soon.
                                </p>
                            </div>
                        ) : isLimitReached ? (
                            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
                                <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                                    Submission Limit Reached
                                </h3>
                                <p className="text-sm text-white/80 sm:text-base">
                                    You&apos;ve already submitted {MAX_SUBMISSIONS} inquiries. Please wait for our response or contact us directly using the information above.
                                </p>
                            </div>
                        ) : (
                            <Form
                                action="/contact"
                                method="post"
                                onBefore={handleBeforeSubmit}
                                onSuccess={handleSuccess}
                            >
                                {({ errors: backendErrors, processing }) => {
                                    const errors = { ...frontendErrors, ...backendErrors };
                                    return (
                                        <div className="space-y-5">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block text-sm font-medium text-white/80"
                                                >
                                                    Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    maxLength={255}
                                                    className={`w-full rounded-lg border ${
                                                        errors.name
                                                            ? 'border-red-500/50 bg-red-500/5'
                                                            : 'border-white/20 bg-white/5'
                                                    } px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none`}
                                                    placeholder="Your name"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
                                                        {errors.name}
                                                    </p>
                                                )}
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
                                                    maxLength={255}
                                                    className={`w-full rounded-lg border ${
                                                        errors.email
                                                            ? 'border-red-500/50 bg-red-500/5'
                                                            : 'border-white/20 bg-white/5'
                                                    } px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none`}
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="mb-2 block text-sm font-medium text-white/80"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    inputMode="numeric"
                                                    maxLength={50}
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className={`w-full rounded-lg border ${
                                                        errors.phone
                                                            ? 'border-red-500/50 bg-red-500/5'
                                                            : 'border-white/20 bg-white/5'
                                                    } px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none`}
                                                    placeholder="1234567890"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-xs text-white/60 sm:text-sm">
                                                * At least one contact method (email or phone) is required
                                            </p>

                                            <div>
                                                <label
                                                    htmlFor="message"
                                                    className="mb-2 block text-sm font-medium text-white/80"
                                                >
                                                    Message <span className="text-red-400">*</span>
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    maxLength={5000}
                                                    rows={6}
                                                    className={`w-full resize-none rounded-lg border ${
                                                        errors.message
                                                            ? 'border-red-500/50 bg-red-500/5'
                                                            : 'border-white/20 bg-white/5'
                                                    } px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white/40 focus:outline-none`}
                                                    placeholder="Tell us about your project..."
                                                />
                                                {errors.message && (
                                                    <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
                                                        {errors.message}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-light text-white transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg
                                                            className="h-5 w-5 animate-spin"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            />
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </button>
                                        </div>
                                    );
                                }}
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
