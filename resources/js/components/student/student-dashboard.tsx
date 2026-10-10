import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    Copy,
    FileText,
    Plus,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mockReviewers } from '@/data/mock-reviewers';
import type { SharedData } from '@/types';
import type { ReviewerItem, ReviewerStatus } from '@/types/reviewer';

interface StudentDashboardProps {
    initialReviewers?: ReviewerItem[];
}

export function StudentDashboard({ initialReviewers }: StudentDashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const [reviewers, setReviewers] = useState<ReviewerItem[]>(
        initialReviewers || mockReviewers,
    );

    const userName = auth?.user?.name || 'Emma Wilson';
    const firstName = userName.split(' ')[0] || 'Emma';

    const currentReviewers = reviewers;
    const totalReviewersCount = currentReviewers.length;
    const totalDocsCount = currentReviewers.reduce(
        (acc, r) => acc + r.documentsCount,
        0,
    );
    const subjectsCount = new Set(currentReviewers.map((r) => r.subject)).size;
    const availableReportsCount = currentReviewers.length > 0 ? 1 : 0;

    const recentReviewers = currentReviewers.slice(0, 4);

    const getStatusBadge = (status: ReviewerStatus) => {
        switch (status) {
            case 'Completed':
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Completed
                    </span>
                );
            case 'Processing':
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/50 dark:text-blue-300">
                        <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
                        Processing
                    </span>
                );
            case 'Draft':
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        Draft
                    </span>
                );
            case 'Failed':
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/60 bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/50 dark:text-rose-300">
                        <span className="size-1.5 rounded-full bg-rose-500" />
                        Failed
                    </span>
                );
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Overview of your reviewers and learning materials
                </p>
            </div>

            {/* Welcome banner section */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Welcome back, {firstName}!
                    </h2>
                    <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                        Pick up where you left off or create a new reviewer.
                    </p>
                </div>
                <Button
                    asChild
                    className="shrink-0 gap-1.5 bg-blue-600 text-white shadow-xs hover:bg-blue-700"
                >
                    <Link href="/reviewers/create">
                        <Plus className="size-4" />
                        Create Reviewer
                    </Link>
                </Button>
            </div>

            {/* 3 Summary Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Total Reviewers */}
                <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Total Reviewers
                        </span>
                        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <BookOpen className="size-4" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            {totalReviewersCount}
                        </div>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {totalReviewersCount > 0
                                ? `Across ${subjectsCount} subjects`
                                : 'No reviewers created yet'}
                        </p>
                    </div>
                </div>

                {/* Total Documents */}
                <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Total Documents
                        </span>
                        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <Copy className="size-4" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            {totalDocsCount}
                        </div>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {totalDocsCount > 0
                                ? 'Your uploaded learning materials'
                                : 'No learning materials uploaded'}
                        </p>
                    </div>
                </div>

                {/* Available Reports */}
                <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Available Reports
                        </span>
                        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <BarChart3 className="size-4" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            {availableReportsCount}
                        </div>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {availableReportsCount > 0
                                ? 'Reviewer Activity report'
                                : 'Reports appear after your first reviewer'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Reviewers Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Recent Reviewers
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Your most recently updated reviewers.
                        </p>
                    </div>
                    {currentReviewers.length > 0 && (
                        <Link
                            href="/reviewers"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                        >
                            <span>View all reviewers</span>
                            <ArrowRight className="size-3.5" />
                        </Link>
                    )}
                </div>

                {/* Empty State vs Reviewers Grid */}
                {currentReviewers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/60">
                        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
                            <BookOpen className="size-7" />
                        </div>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Your first reviewer starts here
                        </h4>
                        <p className="mt-1.5 mb-5 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                            Choose a subject and upload your course materials to
                            create a reviewer. Everything stays together in your
                            workspace.
                        </p>
                        <Button
                            asChild
                            className="mb-3 gap-1.5 bg-blue-600 text-white shadow-xs hover:bg-blue-700"
                        >
                            <Link href="/reviewers/create">
                                <Plus className="size-4" />
                                Create your first reviewer
                            </Link>
                        </Button>
                        <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                            Supports PDF, DOCX or PPTX materials
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {recentReviewers.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                            >
                                <div>
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
                                            <BookOpen className="size-4.5" />
                                        </div>
                                        {getStatusBadge(item.status)}
                                    </div>
                                    <div className="mb-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                                        {item.subject}
                                    </div>
                                    <h4 className="text-base font-bold text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                                        {item.title}
                                    </h4>
                                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                        {item.documentsCount} Documents ·{' '}
                                        {item.status}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/80">
                                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                        {item.updatedAt}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="h-8 gap-1.5 text-xs text-neutral-700 hover:border-blue-200 hover:text-blue-600 dark:text-neutral-300 dark:hover:border-blue-800"
                                    >
                                        <Link href={`/reviewers/${item.id}`}>
                                            <ArrowRight className="size-3.5" />
                                            Open Reviewer
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Banner Section */}
            <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
                        <BarChart3 className="size-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            Your reviewer activity, in one place
                        </h4>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            See status, document counts and dates for all your
                            reviewers.
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-9 shrink-0 px-4 text-xs font-semibold"
                >
                    <Link href="/reports">View reports</Link>
                </Button>
            </div>
        </div>
    );
}
