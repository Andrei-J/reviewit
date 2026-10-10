import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpDown,
    BookOpen,
    Edit2,
    Eye,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteReviewerModal } from '@/components/student/delete-reviewer-modal';
import { EditReviewerModal } from '@/components/student/edit-reviewer-modal';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { mockReviewers } from '@/data/mock-reviewers';
import type { ReviewerItem, ReviewerStatus } from '@/types/reviewer';

interface ReviewersIndexProps {
    initialReviewers?: ReviewerItem[];
}

export default function ReviewersIndex({
    initialReviewers,
}: ReviewersIndexProps) {
    const [reviewers, setReviewers] = useState<ReviewerItem[]>(
        initialReviewers || mockReviewers,
    );
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modals state
    const [editTarget, setEditTarget] = useState<ReviewerItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ReviewerItem | null>(null);

    // Counts for tabs
    const counts = useMemo(() => {
        return {
            all: reviewers.length,
            completed: reviewers.filter((r) => r.status === 'Completed').length,
            processing: reviewers.filter((r) => r.status === 'Processing')
                .length,
            draft: reviewers.filter((r) => r.status === 'Draft').length,
            failed: reviewers.filter((r) => r.status === 'Failed').length,
        };
    }, [reviewers]);

    // Filtering logic
    const filteredReviewers = useMemo(() => {
        return reviewers.filter((r) => {
            // Tab filter
            if (activeTab !== 'all' && r.status.toLowerCase() !== activeTab) {
                return false;
            }

            // Dropdown filter
            if (
                statusFilter !== 'all' &&
                r.status.toLowerCase() !== statusFilter.toLowerCase()
            ) {
                return false;
            }

            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return (
                    r.title.toLowerCase().includes(q) ||
                    r.subject.toLowerCase().includes(q)
                );
            }

            return true;
        });
    }, [reviewers, activeTab, statusFilter, searchQuery]);

    const totalDocsCount = reviewers.reduce(
        (acc, r) => acc + r.documentsCount,
        0,
    );
    const subjectsCount = new Set(reviewers.map((r) => r.subject)).size;

    const handleSaveEdit = (updated: ReviewerItem) => {
        setReviewers((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r)),
        );
    };

    const handleConfirmDelete = (id: string | number) => {
        setReviewers((prev) => prev.filter((r) => r.id !== id));
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
            <Head title="My Reviewers" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                            My Reviewers
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Manage your reviewers and uploaded materials
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

                {/* Library Summary and Filter Tabs */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Your reviewer library
                        </h2>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            {reviewers.length} reviewers · {totalDocsCount}{' '}
                            documents across {subjectsCount} subjects
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto border-b border-neutral-200/80 pb-1 dark:border-neutral-800">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeTab === 'all'
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                        >
                            All reviewers · {counts.all}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('completed')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeTab === 'completed'
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                        >
                            Completed · {counts.completed}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('processing')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeTab === 'processing'
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                        >
                            Processing · {counts.processing}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('draft')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeTab === 'draft'
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                        >
                            Draft · {counts.draft}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('failed')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeTab === 'failed'
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                        >
                            Failed · {counts.failed}
                        </button>
                    </div>

                    {/* Search and Dropdown Filter Row */}
                    <div className="flex flex-col items-stretch justify-between gap-3 pt-1 sm:flex-row sm:items-center">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by reviewer name or subject..."
                                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pr-4 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                            />
                        </div>

                        <div className="w-full shrink-0 sm:w-48">
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="h-9 text-xs">
                                    <SelectValue placeholder="Status: All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="text-xs">
                                        Status: All statuses
                                    </SelectItem>
                                    <SelectItem
                                        value="completed"
                                        className="text-xs"
                                    >
                                        Completed
                                    </SelectItem>
                                    <SelectItem
                                        value="processing"
                                        className="text-xs"
                                    >
                                        Processing
                                    </SelectItem>
                                    <SelectItem
                                        value="draft"
                                        className="text-xs"
                                    >
                                        Draft
                                    </SelectItem>
                                    <SelectItem
                                        value="failed"
                                        className="text-xs"
                                    >
                                        Failed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Reviewers Table */}
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
                                        Last Updated
                                    </th>
                                    <th className="px-4 py-3 text-right sm:px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                {filteredReviewers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-12 text-center text-neutral-400 dark:text-neutral-500"
                                        >
                                            No reviewers found matching your
                                            criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReviewers.map((r) => (
                                        <tr
                                            key={r.id}
                                            className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                                        >
                                            {/* Reviewer Name with Icon */}
                                            <td className="px-4 py-3.5 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                                        <BookOpen className="size-4" />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/reviewers/${r.id}`}
                                                            className="font-semibold text-neutral-900 transition-colors hover:text-blue-600 dark:text-neutral-100 dark:hover:text-blue-400"
                                                        >
                                                            {r.title}
                                                        </Link>
                                                        <p className="text-[11px] text-neutral-400 sm:hidden dark:text-neutral-500">
                                                            {r.subject}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-4 py-3.5 font-medium text-neutral-600 sm:px-6 dark:text-neutral-300">
                                                {r.subject}
                                            </td>

                                            {/* Documents Count */}
                                            <td className="px-4 py-3.5 text-neutral-600 sm:px-6 dark:text-neutral-400">
                                                {r.documentsCount}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-3.5 sm:px-6">
                                                {getStatusBadge(r.status)}
                                            </td>

                                            {/* Last Updated */}
                                            <td className="px-4 py-3.5 text-neutral-500 sm:px-6 dark:text-neutral-400">
                                                {r.createdAt || 'Oct 10, 2026'}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="px-4 py-3.5 text-right sm:px-6">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/50"
                                                    >
                                                        <Link
                                                            href={`/reviewers/${r.id}`}
                                                        >
                                                            Open reviewer
                                                        </Link>
                                                    </Button>
                                                    <span className="text-neutral-300 dark:text-neutral-700">
                                                        ·
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setEditTarget(r)
                                                        }
                                                        className="h-7 px-2 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <span className="text-neutral-300 dark:text-neutral-700">
                                                        ·
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setDeleteTarget(r)
                                                        }
                                                        className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex items-center justify-between border-t border-neutral-200/80 bg-neutral-50/50 px-4 py-3 text-xs text-neutral-500 sm:px-6 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
                        <span>
                            Showing {filteredReviewers.length} of{' '}
                            {reviewers.length} reviewers
                        </span>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditReviewerModal
                reviewer={editTarget}
                isOpen={!!editTarget}
                onClose={() => setEditTarget(null)}
                onSave={handleSaveEdit}
            />

            <DeleteReviewerModal
                reviewer={deleteTarget}
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

ReviewersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Reviewers', href: '/reviewers' },
    ],
};
