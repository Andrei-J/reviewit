import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import {
    Check,
    ChevronDown,
    GraduationCap,
    Menu,
    X,
    Quote,
    Twitter,
    Github,
    Linkedin,
} from 'lucide-react';

interface QuizOption {
    id: string;
    text: string;
}

const QUIZ_OPTIONS: QuizOption[] = [
    {
        id: 'A',
        text: 'Synthesis of proteins and packaging of ribosomal units.',
    },
    {
        id: 'B',
        text: 'Production of ATP through cellular respiration.',
    },
    {
        id: 'C',
        text: 'Degradation of cellular waste products via hydrolytic enzymes.',
    },
    {
        id: 'D',
        text: 'Storage of genetic information and coordination of cell division.',
    },
];

const ACADEMIC_HUBS = [
    { name: 'Stanford' },
    { name: 'Berkeley' },
    { name: 'MIT' },
    { name: 'Cambridge' },
    { name: 'Harvard' },
    { name: 'Oxford' },
];

const FAQS = [
    {
        question: 'Can I upload handwritten notes?',
        answer: 'Yes. Our OCR engine transcribes handwritten scans and extracts clean study guide contexts effortlessly.',
    },
    {
        question: 'How accurate are the AI mock tests?',
        answer: 'Highly accurate. We cross-reference questions directly with your source material to eliminate hallucinations.',
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Of course. There are no lock-ins. You can downgrade to the free tier whenever you wish.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedQuizOption, setSelectedQuizOption] = useState<string>('B');
    const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1, 2]);

    const toggleFaq = (index: number) => {
        if (openFaqIndexes.includes(index)) {
            setOpenFaqIndexes(openFaqIndexes.filter((i) => i !== index));
        } else {
            setOpenFaqIndexes([...openFaqIndexes, index]);
        }
    };

    return (
        <>
            <Head title="ReviewIT — Smart Study Platform" />

            <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased selection:bg-[#0062FF]/10 selection:text-[#0062FF]">
                {/* Navigation */}
                <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md transition-all">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Brand Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0062FF] text-xl font-extrabold tracking-tight text-white shadow-sm transition-transform group-hover:scale-105">
                                R
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-neutral-950">
                                Review<span className="text-[#0062FF]">IT</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
                            <a
                                href="#features"
                                className="transition-colors hover:text-neutral-900"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="transition-colors hover:text-neutral-900"
                            >
                                How it Works
                            </a>
                            <a
                                href="#testimonials"
                                className="transition-colors hover:text-neutral-900"
                            >
                                Testimonials
                            </a>
                            <a
                                href="#pricing"
                                className="transition-colors hover:text-neutral-900"
                            >
                                Pricing
                            </a>
                            <a
                                href="#faq"
                                className="transition-colors hover:text-neutral-900"
                            >
                                FAQ
                            </a>
                        </nav>

                        {/* Desktop Auth CTA */}
                        <div className="hidden items-center gap-4 md:flex">
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-xl bg-[#0062FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:text-neutral-950"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-xl bg-[#0062FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        Sign Up Free
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                                aria-label="Toggle navigation menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-6" />
                                ) : (
                                    <Menu className="size-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile dropdown */}
                    {mobileMenuOpen && (
                        <div className="space-y-4 border-b border-neutral-100 bg-white px-4 pt-2 pb-6 md:hidden">
                            <div className="flex flex-col space-y-3 text-base font-medium text-neutral-700">
                                <a
                                    href="#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-2 py-1.5 hover:text-neutral-950"
                                >
                                    Features
                                </a>
                                <a
                                    href="#how-it-works"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-2 py-1.5 hover:text-neutral-950"
                                >
                                    How it Works
                                </a>
                                <a
                                    href="#testimonials"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-2 py-1.5 hover:text-neutral-950"
                                >
                                    Testimonials
                                </a>
                                <a
                                    href="#pricing"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-2 py-1.5 hover:text-neutral-950"
                                >
                                    Pricing
                                </a>
                                <a
                                    href="#faq"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-2 py-1.5 hover:text-neutral-950"
                                >
                                    FAQ
                                </a>
                            </div>
                            <div className="flex flex-col gap-2.5 border-t border-neutral-100 pt-4">
                                {auth?.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="w-full rounded-xl bg-[#0062FF] py-2.5 text-center text-sm font-semibold text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="w-full rounded-xl border border-neutral-200 py-2.5 text-center text-sm font-semibold text-neutral-800"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="w-full rounded-xl bg-[#0062FF] py-2.5 text-center text-sm font-semibold text-white"
                                        >
                                            Sign Up Free
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                <main>
                    {/* Hero Section */}
                    <section
                        id="features"
                        className="mx-auto max-w-5xl px-4 pt-16 pb-20 text-center sm:px-6 md:pt-24 md:pb-28 lg:px-8"
                    >
                        {/* Pill Tag */}
                        <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0062FF] uppercase">
                            SMART STUDY PLATFORM
                        </div>

                        {/* Hero Headline */}
                        <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl lg:text-[68px]">
                            Stop memorizing.
                            <br />
                            Start{' '}
                            <span className="text-[#0062FF]">
                                understanding
                            </span>
                            .
                        </h1>

                        {/* Hero Subtitle */}
                        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg md:text-xl">
                            Generate smart mock tests, compile comprehensive
                            reviewers from your lectures, and tackle your exams
                            with data-driven confidence.
                        </p>

                        {/* Hero Action Buttons */}
                        <div className="mb-16 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                            <Link
                                href={register()}
                                className="w-full rounded-xl bg-[#0062FF] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto sm:text-base"
                            >
                                Create Free Account
                            </Link>
                            <a
                                href="#how-it-works"
                                className="w-full rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 sm:w-auto sm:text-base"
                            >
                                See How it Works
                            </a>
                        </div>

                        {/* Interactive Hero Study Mockup Card */}
                        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-xl shadow-blue-500/5">
                            {/* Window header */}
                            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                                    <span className="ml-3 text-xs font-medium text-neutral-600 md:text-sm">
                                        biology_midterm_reviewer.pdf
                                    </span>
                                </div>
                                <span className="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0062FF]">
                                    AI Ready
                                </span>
                            </div>

                            {/* Question Card Content */}
                            <div className="p-6 md:p-8">
                                <h2 className="mb-6 text-base leading-snug font-bold text-neutral-900 md:text-lg">
                                    Question 3 of 25: Which of the following
                                    best describes the function of mitochondria?
                                </h2>

                                {/* Options List */}
                                <div className="space-y-3">
                                    {QUIZ_OPTIONS.map((option) => {
                                        const isSelected =
                                            selectedQuizOption === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedQuizOption(
                                                        option.id,
                                                    )
                                                }
                                                className={`flex w-full items-center gap-3.5 rounded-xl p-4 text-left transition-all ${
                                                    isSelected
                                                        ? 'border-2 border-[#0062FF] bg-blue-50/60 shadow-sm'
                                                        : 'border border-neutral-200/90 bg-neutral-50/40 hover:border-neutral-300 hover:bg-neutral-50'
                                                }`}
                                            >
                                                <span
                                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                                                        isSelected
                                                            ? 'bg-[#0062FF] text-white'
                                                            : 'border border-neutral-200 bg-white text-neutral-600'
                                                    }`}
                                                >
                                                    {option.id}
                                                </span>
                                                <span
                                                    className={`text-sm leading-relaxed md:text-base ${
                                                        isSelected
                                                            ? 'font-medium text-neutral-900'
                                                            : 'text-neutral-700'
                                                    }`}
                                                >
                                                    {option.text}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Academic Hubs Social Proof Banner */}
                    <section className="border-t border-neutral-100 bg-white py-14">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <h2 className="mb-8 text-center text-xs font-bold tracking-widest text-neutral-400 uppercase">
                                EMPOWERING STUDENTS AT TOP ACADEMIC HUBS
                            </h2>
                            <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-600 sm:gap-12 md:gap-16">
                                {ACADEMIC_HUBS.map((hub) => (
                                    <div
                                        key={hub.name}
                                        className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-neutral-900 sm:text-base"
                                    >
                                        <GraduationCap className="size-5 text-neutral-500" />
                                        <span>{hub.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Process / How It Works */}
                    <section
                        id="how-it-works"
                        className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8"
                    >
                        {/* Process Pill */}
                        <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0062FF] uppercase">
                            PROCESS
                        </div>

                        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                            Three steps to peak preparedness
                        </h2>

                        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3 md:gap-10">
                            {/* Step 1 */}
                            <div className="flex flex-col">
                                <div className="mb-4 flex items-center gap-4">
                                    <span className="text-4xl font-black tracking-tight text-[#0062FF] md:text-5xl">
                                        01
                                    </span>
                                    <div className="h-[2px] flex-1 bg-neutral-200" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-neutral-950">
                                    Upload Materials
                                </h3>
                                <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
                                    Drop lecture slides, notes, or textbook PDFs
                                    into your secure dashboard.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col">
                                <div className="mb-4 flex items-center gap-4">
                                    <span className="text-4xl font-black tracking-tight text-[#0062FF] md:text-5xl">
                                        02
                                    </span>
                                    <div className="h-[2px] flex-1 bg-neutral-200" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-neutral-950">
                                    Set Exam Parameters
                                </h3>
                                <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
                                    Specify your exam format, question count,
                                    and level of difficulty.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col">
                                <div className="mb-4 flex items-center gap-4">
                                    <span className="text-4xl font-black tracking-tight text-[#0062FF] md:text-5xl">
                                        03
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-neutral-950">
                                    Revise &amp; Conquer
                                </h3>
                                <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
                                    Take mock tests, study instant explanations,
                                    and master your materials.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials / Social Proof */}
                    <section
                        id="testimonials"
                        className="mx-auto max-w-6xl px-4 pb-20 text-center sm:px-6 md:pb-28 lg:px-8"
                    >
                        {/* Social Proof Pill */}
                        <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0062FF] uppercase">
                            SOCIAL PROOF
                        </div>

                        <h2 className="mb-14 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                            Tested and approved by students
                        </h2>

                        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
                            {/* Testimonial 1 */}
                            <div className="relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-neutral-300 md:p-10">
                                <div className="mb-6">
                                    <Quote className="size-8 rotate-180 fill-[#0062FF]/15 text-[#0062FF]" />
                                </div>
                                <p className="mb-6 text-sm leading-relaxed font-normal text-neutral-700 md:text-base">
                                    &ldquo;Before ReviewIT, I was just
                                    highlighting slides. The mock tests forced
                                    me to actually recall information, raising
                                    my Chemistry score from a C to an A-.&rdquo;
                                </p>
                                <div>
                                    <div className="text-base font-bold text-neutral-900">
                                        Marcus Chen
                                    </div>
                                    <div className="mt-0.5 text-sm text-neutral-500">
                                        Pre-Med Student, UT Austin
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-neutral-300 md:p-10">
                                <div className="mb-6">
                                    <Quote className="size-8 rotate-180 fill-[#0062FF]/15 text-[#0062FF]" />
                                </div>
                                <p className="mb-6 text-sm leading-relaxed font-normal text-neutral-700 md:text-base">
                                    &ldquo;Creating study guides for law school
                                    is incredibly time consuming. ReviewIT
                                    summarizes cases into flashcards in minutes
                                    without missing key legal precedents.&rdquo;
                                </p>
                                <div>
                                    <div className="text-base font-bold text-neutral-900">
                                        Sophia Sterling
                                    </div>
                                    <div className="mt-0.5 text-sm text-neutral-500">
                                        JD Candidate, Stanford Law
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section
                        id="pricing"
                        className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8"
                    >
                        {/* Pricing Pill */}
                        <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0062FF] uppercase">
                            SIMPLE PRICING
                        </div>

                        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                            Choose your academic weapon
                        </h2>

                        <div className="grid grid-cols-1 items-stretch gap-8 text-left lg:grid-cols-3">
                            {/* Free Solo */}
                            <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-neutral-300 md:p-9">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Free Solo
                                    </h3>
                                    <p className="mt-1 mb-6 text-sm text-neutral-500">
                                        Perfect for secondary review sessions.
                                    </p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-black tracking-tight text-neutral-950 md:text-5xl">
                                            $0
                                        </span>
                                    </div>
                                    <div className="mb-6 h-px bg-neutral-100" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>3 Reviewers / month</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Up to 50 questions per test
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Import basic PDFs / TXT files
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Standard processing speed
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
                                    >
                                        Start Free
                                    </Link>
                                </div>
                            </div>

                            {/* Pro Scholar (Highlighted) */}
                            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-[#0062FF] bg-white p-8 shadow-xl shadow-blue-500/10 transition md:p-9">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Pro Scholar
                                    </h3>
                                    <p className="mt-1 mb-6 text-sm text-neutral-500">
                                        For rigorous university preparation.
                                    </p>
                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl font-black tracking-tight text-neutral-950 md:text-5xl">
                                            $9
                                        </span>
                                        <span className="text-sm font-medium text-neutral-500">
                                            / mo
                                        </span>
                                    </div>
                                    <div className="mb-6 h-px bg-neutral-100" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>Unlimited Reviewers</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>Unlimited Mock Tests</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                AI explanations &amp; study
                                                paths
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>Prioritized processing</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Comprehensive performance charts
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="block w-full rounded-xl bg-[#0062FF] px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                                    >
                                        Upgrade Now
                                    </Link>
                                </div>
                            </div>

                            {/* Study Syndicate */}
                            <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-neutral-300 md:p-9">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Study Syndicate
                                    </h3>
                                    <p className="mt-1 mb-6 text-sm text-neutral-500">
                                        For groups and study fraternities.
                                    </p>
                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl font-black tracking-tight text-neutral-950 md:text-5xl">
                                            $19
                                        </span>
                                        <span className="text-sm font-medium text-neutral-500">
                                            / mo
                                        </span>
                                    </div>
                                    <div className="mb-6 h-px bg-neutral-100" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Shared workspace (5 seats)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Collaborative test creation
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Co-authoring study guides
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 shrink-0 text-[#0062FF]" />
                                            <span>
                                                Team analytics &amp; grade
                                                averages
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
                                    >
                                        Upgrade Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section
                        id="faq"
                        className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 md:pb-32"
                    >
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => {
                                const isOpen = openFaqIndexes.includes(index);
                                return (
                                    <div
                                        key={faq.question}
                                        className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="flex w-full items-center justify-between p-6 text-left font-bold text-neutral-900 transition-colors hover:text-neutral-950"
                                        >
                                            <span className="text-base md:text-lg">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`ml-4 size-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pt-0 pb-6 text-sm leading-relaxed text-neutral-600 md:text-base">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Pre-Footer Call to Action Banner */}
                    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
                        <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-neutral-950 sm:text-5xl md:text-[54px]">
                            Ace your next exam cycle.
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
                            Get started for free today and experience active
                            retrieval study tools. No credit card required.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                            <Link
                                href={register()}
                                className="w-full rounded-xl bg-[#0062FF] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto sm:text-base"
                            >
                                Sign Up Now (It's Free)
                            </Link>
                            <a
                                href="mailto:sales@reviewit.com"
                                className="w-full rounded-xl border border-neutral-200 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50 sm:w-auto sm:text-base"
                            >
                                Talk to Sales
                            </a>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 lg:gap-12">
                            {/* Brand info */}
                            <div className="md:col-span-2">
                                <Link
                                    href="/"
                                    className="group flex inline-flex items-center gap-2.5"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0062FF] text-lg font-extrabold tracking-tight text-white shadow-sm">
                                        R
                                    </div>
                                    <span className="text-xl font-extrabold tracking-tight text-neutral-950">
                                        Review
                                        <span className="text-[#0062FF]">
                                            IT
                                        </span>
                                    </span>
                                </Link>
                                <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
                                    Leveraging cognitive science and advanced
                                    active retrieval workflows to simplify
                                    student learning globally.
                                </p>
                            </div>

                            {/* Product column */}
                            <div>
                                <h3 className="mb-4 text-sm font-bold text-neutral-900">
                                    Product
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Mock Tests
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Study Guides
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Flashcards
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Analytics
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company column */}
                            <div>
                                <h3 className="mb-4 text-sm font-bold text-neutral-900">
                                    Company
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Our Philosophy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Security
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:contact@reviewit.com"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal column */}
                            <div>
                                <h3 className="mb-4 text-sm font-bold text-neutral-900">
                                    Legal
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Honor Code
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="transition-colors hover:text-neutral-950"
                                        >
                                            Compliance
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 text-xs text-neutral-500 sm:flex-row">
                            <div>
                                &copy; 2026 ReviewIT Technologies Inc. All
                                rights reserved. Built with cognitive design
                                patterns.
                            </div>
                            <div className="flex items-center gap-5 text-neutral-500">
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-neutral-900"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="size-4" />
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-neutral-900"
                                    aria-label="GitHub"
                                >
                                    <Github className="size-4" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-neutral-900"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
