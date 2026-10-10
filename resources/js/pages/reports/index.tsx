import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    CheckCircle2,
    Clock,
    FileEdit,
    FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockReviewers } from '@/data/mock-reviewers';
import type { ReviewerItem, ReviewerStatus } from '@/types/reviewer';

export default function ReportsIndex() {
    const reviewers = mockReviewers;
    const totalDocsCount = reviewers.reduce(
        (acc, r) => acc + r.documentsCount,
        0,
    );

    const counts = {
        total: reviewers.length,
        completed: reviewers.filter((r) => r.status === 'Completed').length,
        processing: reviewers.filter((r) => r.status === 'Processing').length,
        draft: reviewers.filter((r) => r.status === 'Draft').length,
    };

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
        <>
            <Head title="Reports" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                        Reports
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        A simple overview of your reviewer activity
                    </p>
                </div>

                {/* Top Section: Your reviewers at a glance */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Your reviewers at a glance
                        </h2>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            Activity summary as of October 10, 2026
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Reviewers */}
                        <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Total Reviewers
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                    <BookOpen className="size-4" />
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                    {counts.total}
                                </div>
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    {totalDocsCount} uploaded documents
                                </p>
                            </div>
                        </div>

                        {/* Completed */}
                        <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Completed
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                    <CheckCircle2 className="size-4" />
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                    {counts.completed}
                                </div>
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    Reviewers with a completed processing status
                                </p>
                            </div>
                        </div>

                        {/* Processing */}
                        <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Processing
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                    <Clock className="size-4" />
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                    {counts.processing}
                                </div>
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    Reviewer currently being processed
                                </p>
                            </div>
                        </div>

                        {/* Drafts */}
                        <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Drafts
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                                    <FileEdit className="size-4" />
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                    {counts.draft}
                                </div>
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    Reviewer not yet submitted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Reviewer Activity Table */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Reviewer Activity
                        </h2>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            All {reviewers.length} reviewers including 3 total
                            spaces / {totalDocsCount} documents total
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="border-b border-neutral-200/80 bg-neutral-50/80 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-400">
                                    <tr>
                                        <th className="px-4 py-3 sm:px-6">
                                            Reviewer
                                        </th>
                                        <th className="px-4 py-3 sm:px-6">
                                            Subject
                                        </th>
                                        <th className="px-4 py-3 sm:px-6">
                                            Documents
                                        </th>
                                        <th className="px-4 py-3 sm:px-6">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 sm:px-6">
                                            Date Created
                                        </th>
                                        <th className="px-4 py-3 sm:px-6">
                                            Last Updated
                                        </th>
                                        <th className="px-4 py-3 text-right sm:px-6">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                    {reviewers.map((r) => (
                                        <tr
                                            key={r.id}
                                            className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 dark:text-neutral-100">
                                                {r.title}
                                            </td>
                                            <td className="px-4 py-3.5 text-neutral-600 sm:px-6 dark:text-neutral-300">
                                                {r.subject}
                                            </td>
                                            <td className="px-4 py-3.5 text-neutral-600 sm:px-6 dark:text-neutral-400">
                                                {r.documentsCount}
                                            </td>
                                            <td className="px-4 py-3.5 sm:px-6">
                                                {getStatusBadge(r.status)}
                                            </td>
                                            <td className="px-4 py-3.5 text-neutral-500 sm:px-6 dark:text-neutral-400">
                                                {r.createdAt || 'Oct 8, 2026'}
                                            </td>
                                            <td className="px-4 py-3.5 text-neutral-500 sm:px-6 dark:text-neutral-400">
                                                {r.updatedAt || 'Oct 10, 2026'}
                                            </td>
                                            <td className="px-4 py-3.5 text-right sm:px-6">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/50"
                                                >
                                                    <Link
                                                        href={`/reviewers/${r.id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="flex items-center justify-between border-t border-neutral-200/80 bg-neutral-50/50 px-4 py-3 text-xs text-neutral-500 sm:px-6 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
                            <span>
                                Showing {reviewers.length} of {reviewers.length}{' '}
                                reviewers
                            </span>
                            <span className="text-[11px] text-neutral-400">
                                Generated today at 10:24 AM
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ReportsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Reports', href: '/reports' },
    ],
};
