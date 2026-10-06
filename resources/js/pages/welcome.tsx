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

            <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-[#0062FF]/10 selection:text-[#0062FF]">
                {/* Navigation */}
                <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-[#0062FF] flex items-center justify-center text-white font-extrabold text-xl shadow-sm tracking-tight transition-transform group-hover:scale-105">
                                R
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-neutral-950">
                                Review<span className="text-[#0062FF]">IT</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
                            <a
                                href="#features"
                                className="hover:text-neutral-900 transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="hover:text-neutral-900 transition-colors"
                            >
                                How it Works
                            </a>
                            <a
                                href="#testimonials"
                                className="hover:text-neutral-900 transition-colors"
                            >
                                Testimonials
                            </a>
                            <a
                                href="#pricing"
                                className="hover:text-neutral-900 transition-colors"
                            >
                                Pricing
                            </a>
                            <a
                                href="#faq"
                                className="hover:text-neutral-900 transition-colors"
                            >
                                FAQ
                            </a>
                        </nav>

                        {/* Desktop Auth CTA */}
                        <div className="hidden md:flex items-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="px-5 py-2.5 rounded-xl bg-[#0062FF] text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-semibold text-neutral-800 hover:text-neutral-950 px-3 py-2 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="px-5 py-2.5 rounded-xl bg-[#0062FF] text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
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
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition"
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
                        <div className="md:hidden border-b border-neutral-100 bg-white px-4 pt-2 pb-6 space-y-4">
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
                            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
                                {auth?.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="w-full text-center py-2.5 rounded-xl bg-[#0062FF] text-white font-semibold text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="w-full text-center py-2.5 rounded-xl border border-neutral-200 text-neutral-800 font-semibold text-sm"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="w-full text-center py-2.5 rounded-xl bg-[#0062FF] text-white font-semibold text-sm"
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
                        className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
                    >
                        {/* Pill Tag */}
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-[#0062FF] text-xs font-bold tracking-wider uppercase mb-8">
                            SMART STUDY PLATFORM
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-6">
                            Stop memorizing.
                            <br />
                            Start <span className="text-[#0062FF]">understanding</span>.
                        </h1>

                        {/* Hero Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed mb-8">
                            Generate smart mock tests, compile comprehensive reviewers from
                            your lectures, and tackle your exams with data-driven confidence.
                        </p>

                        {/* Hero Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
                            <Link
                                href={register()}
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0062FF] text-white font-semibold text-sm sm:text-base hover:bg-blue-700 transition shadow-sm"
                            >
                                Create Free Account
                            </Link>
                            <a
                                href="#how-it-works"
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 font-semibold text-sm sm:text-base hover:bg-neutral-50 hover:border-neutral-400 transition shadow-sm"
                            >
                                See How it Works
                            </a>
                        </div>

                        {/* Interactive Hero Study Mockup Card */}
                        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-blue-500/5 max-w-3xl mx-auto text-left overflow-hidden">
                            {/* Window header */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                    <span className="ml-3 text-xs md:text-sm font-medium text-neutral-600">
                                        biology_midterm_reviewer.pdf
                                    </span>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-[#0062FF] border border-blue-100">
                                    AI Ready
                                </span>
                            </div>

                            {/* Question Card Content */}
                            <div className="p-6 md:p-8">
                                <h2 className="font-bold text-neutral-900 text-base md:text-lg mb-6 leading-snug">
                                    Question 3 of 25: Which of the following best describes
                                    the function of mitochondria?
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
                                                    setSelectedQuizOption(option.id)
                                                }
                                                className={`w-full text-left rounded-xl p-4 flex items-center gap-3.5 transition-all ${
                                                    isSelected
                                                        ? 'border-2 border-[#0062FF] bg-blue-50/60 shadow-sm'
                                                        : 'border border-neutral-200/90 bg-neutral-50/40 hover:bg-neutral-50 hover:border-neutral-300'
                                                }`}
                                            >
                                                <span
                                                    className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                                                        isSelected
                                                            ? 'bg-[#0062FF] text-white'
                                                            : 'bg-white border border-neutral-200 text-neutral-600'
                                                    }`}
                                                >
                                                    {option.id}
                                                </span>
                                                <span
                                                    className={`text-sm md:text-base leading-relaxed ${
                                                        isSelected
                                                            ? 'text-neutral-900 font-medium'
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
                    <section className="py-14 bg-white border-t border-neutral-100">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <h2 className="text-xs font-bold text-neutral-400 tracking-widest text-center uppercase mb-8">
                                EMPOWERING STUDENTS AT TOP ACADEMIC HUBS
                            </h2>
                            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 text-neutral-600">
                                {ACADEMIC_HUBS.map((hub) => (
                                    <div
                                        key={hub.name}
                                        className="flex items-center gap-2 text-sm sm:text-base font-semibold hover:text-neutral-900 transition-colors"
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
                        className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    >
                        {/* Process Pill */}
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-[#0062FF] text-xs font-bold tracking-wider uppercase mb-4">
                            PROCESS
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-16">
                            Three steps to peak preparedness
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-left">
                            {/* Step 1 */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl md:text-5xl font-black text-[#0062FF] tracking-tight">
                                        01
                                    </span>
                                    <div className="h-[2px] flex-1 bg-neutral-200" />
                                </div>
                                <h3 className="font-bold text-neutral-950 text-lg mb-2">
                                    Upload Materials
                                </h3>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                                    Drop lecture slides, notes, or textbook PDFs into your
                                    secure dashboard.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl md:text-5xl font-black text-[#0062FF] tracking-tight">
                                        02
                                    </span>
                                    <div className="h-[2px] flex-1 bg-neutral-200" />
                                </div>
                                <h3 className="font-bold text-neutral-950 text-lg mb-2">
                                    Set Exam Parameters
                                </h3>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                                    Specify your exam format, question count, and level of
                                    difficulty.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl md:text-5xl font-black text-[#0062FF] tracking-tight">
                                        03
                                    </span>
                                </div>
                                <h3 className="font-bold text-neutral-950 text-lg mb-2">
                                    Revise &amp; Conquer
                                </h3>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                                    Take mock tests, study instant explanations, and master
                                    your materials.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials / Social Proof */}
                    <section
                        id="testimonials"
                        className="pb-20 md:pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    >
                        {/* Social Proof Pill */}
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-[#0062FF] text-xs font-bold tracking-wider uppercase mb-4">
                            SOCIAL PROOF
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-14">
                            Tested and approved by students
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            {/* Testimonial 1 */}
                            <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm relative hover:border-neutral-300 transition">
                                <div className="mb-6">
                                    <Quote className="size-8 text-[#0062FF] fill-[#0062FF]/15 rotate-180" />
                                </div>
                                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6 font-normal">
                                    &ldquo;Before ReviewIT, I was just highlighting slides.
                                    The mock tests forced me to actually recall information,
                                    raising my Chemistry score from a C to an A-.&rdquo;
                                </p>
                                <div>
                                    <div className="font-bold text-neutral-900 text-base">
                                        Marcus Chen
                                    </div>
                                    <div className="text-neutral-500 text-sm mt-0.5">
                                        Pre-Med Student, UT Austin
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm relative hover:border-neutral-300 transition">
                                <div className="mb-6">
                                    <Quote className="size-8 text-[#0062FF] fill-[#0062FF]/15 rotate-180" />
                                </div>
                                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6 font-normal">
                                    &ldquo;Creating study guides for law school is
                                    incredibly time consuming. ReviewIT summarizes cases
                                    into flashcards in minutes without missing key legal
                                    precedents.&rdquo;
                                </p>
                                <div>
                                    <div className="font-bold text-neutral-900 text-base">
                                        Sophia Sterling
                                    </div>
                                    <div className="text-neutral-500 text-sm mt-0.5">
                                        JD Candidate, Stanford Law
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section
                        id="pricing"
                        className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    >
                        {/* Pricing Pill */}
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-[#0062FF] text-xs font-bold tracking-wider uppercase mb-4">
                            SIMPLE PRICING
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-16">
                            Choose your academic weapon
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
                            {/* Free Solo */}
                            <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-9 flex flex-col justify-between shadow-sm hover:border-neutral-300 transition">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Free Solo
                                    </h3>
                                    <p className="text-neutral-500 text-sm mt-1 mb-6">
                                        Perfect for secondary review sessions.
                                    </p>
                                    <div className="mb-6">
                                        <span className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight">
                                            $0
                                        </span>
                                    </div>
                                    <div className="h-px bg-neutral-100 mb-6" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>3 Reviewers / month</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Up to 50 questions per test</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Import basic PDFs / TXT files</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Standard processing speed</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="w-full py-3 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-800 font-semibold text-center hover:bg-neutral-50 transition shadow-sm block text-sm"
                                    >
                                        Start Free
                                    </Link>
                                </div>
                            </div>

                            {/* Pro Scholar (Highlighted) */}
                            <div className="rounded-3xl border-2 border-[#0062FF] bg-white p-8 md:p-9 flex flex-col justify-between shadow-xl shadow-blue-500/10 relative transition">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Pro Scholar
                                    </h3>
                                    <p className="text-neutral-500 text-sm mt-1 mb-6">
                                        For rigorous university preparation.
                                    </p>
                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight">
                                            $9
                                        </span>
                                        <span className="text-neutral-500 text-sm font-medium">
                                            / mo
                                        </span>
                                    </div>
                                    <div className="h-px bg-neutral-100 mb-6" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Unlimited Reviewers</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Unlimited Mock Tests</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>AI explanations &amp; study paths</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Prioritized processing</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Comprehensive performance charts</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="w-full py-3 px-4 rounded-xl bg-[#0062FF] text-white font-semibold text-center hover:bg-blue-700 transition shadow-md block text-sm"
                                    >
                                        Upgrade Now
                                    </Link>
                                </div>
                            </div>

                            {/* Study Syndicate */}
                            <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-9 flex flex-col justify-between shadow-sm hover:border-neutral-300 transition">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950">
                                        Study Syndicate
                                    </h3>
                                    <p className="text-neutral-500 text-sm mt-1 mb-6">
                                        For groups and study fraternities.
                                    </p>
                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight">
                                            $19
                                        </span>
                                        <span className="text-neutral-500 text-sm font-medium">
                                            / mo
                                        </span>
                                    </div>
                                    <div className="h-px bg-neutral-100 mb-6" />
                                    <ul className="space-y-3.5 text-sm text-neutral-700">
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Shared workspace (5 seats)</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Collaborative test creation</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Co-authoring study guides</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Check className="size-4 text-[#0062FF] shrink-0" />
                                            <span>Team analytics &amp; grade averages</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="w-full py-3 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-800 font-semibold text-center hover:bg-neutral-50 transition shadow-sm block text-sm"
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
                        className="pb-24 md:pb-32 max-w-3xl mx-auto px-4 sm:px-6"
                    >
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => {
                                const isOpen = openFaqIndexes.includes(index);
                                return (
                                    <div
                                        key={faq.question}
                                        className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="w-full p-6 text-left flex items-center justify-between font-bold text-neutral-900 hover:text-neutral-950 transition-colors"
                                        >
                                            <span className="text-base md:text-lg">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`size-5 text-neutral-500 shrink-0 ml-4 transition-transform duration-200 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pb-6 pt-0 text-neutral-600 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Pre-Footer Call to Action Banner */}
                    <section className="py-20 md:py-28 text-center max-w-4xl mx-auto px-4 sm:px-6">
                        <h2 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold text-neutral-950 tracking-tight mb-4 leading-tight">
                            Ace your next exam cycle.
                        </h2>
                        <p className="text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                            Get started for free today and experience active retrieval study
                            tools. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                            <Link
                                href={register()}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0062FF] text-white font-semibold text-sm sm:text-base hover:bg-blue-700 transition shadow-sm"
                            >
                                Sign Up Now (It's Free)
                            </Link>
                            <a
                                href="mailto:sales@reviewit.com"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 font-semibold text-sm sm:text-base hover:bg-neutral-50 transition shadow-sm"
                            >
                                Talk to Sales
                            </a>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-neutral-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">
                            {/* Brand info */}
                            <div className="md:col-span-2">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2.5 group inline-flex"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-[#0062FF] flex items-center justify-center text-white font-extrabold text-lg shadow-sm tracking-tight">
                                        R
                                    </div>
                                    <span className="text-xl font-extrabold tracking-tight text-neutral-950">
                                        Review<span className="text-[#0062FF]">IT</span>
                                    </span>
                                </Link>
                                <p className="text-neutral-500 text-sm max-w-xs mt-4 leading-relaxed">
                                    Leveraging cognitive science and advanced active
                                    retrieval workflows to simplify student learning
                                    globally.
                                </p>
                            </div>

                            {/* Product column */}
                            <div>
                                <h3 className="font-bold text-neutral-900 text-sm mb-4">
                                    Product
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Mock Tests
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Study Guides
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Flashcards
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Analytics
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company column */}
                            <div>
                                <h3 className="font-bold text-neutral-900 text-sm mb-4">
                                    Company
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Our Philosophy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Security
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:contact@reviewit.com"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal column */}
                            <div>
                                <h3 className="font-bold text-neutral-900 text-sm mb-4">
                                    Legal
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-600">
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Honor Code
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-neutral-950 transition-colors"
                                        >
                                            Compliance
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="border-t border-neutral-100 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                            <div>
                                &copy; 2026 ReviewIT Technologies Inc. All rights reserved.
                                Built with cognitive design patterns.
                            </div>
                            <div className="flex items-center gap-5 text-neutral-500">
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-neutral-900 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="size-4" />
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-neutral-900 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="size-4" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-neutral-900 transition-colors"
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
