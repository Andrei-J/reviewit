import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    FileText,
    Plus,
    Presentation,
    Upload,
} from 'lucide-react';
import { useState } from 'react';
import { EditReviewerModal } from '@/components/student/edit-reviewer-modal';
import { Button } from '@/components/ui/button';
import { mockReviewers } from '@/data/mock-reviewers';
import type { ReviewerItem } from '@/types/reviewer';

interface ReviewerShowProps {
    reviewer?: ReviewerItem;
    id?: string;
}

export default function ReviewerShow({
    reviewer: propReviewer,
    id,
}: ReviewerShowProps) {
    const initial =
        propReviewer ||
        mockReviewers.find((r) => r.id.toString() === id?.toString()) ||
        mockReviewers[0];

    const [reviewer, setReviewer] = useState<ReviewerItem>(initial);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleSaveEdit = (updated: ReviewerItem) => {
        setReviewer(updated);
    };

    return (
        <>
            <Head title={`${reviewer.title} - Reviewer Details`} />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Back to library navigation */}
                <div>
                    <Link
                        href="/reviewers"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Back to My Reviewers</span>
                    </Link>
                </div>

                {/* Page Title */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                        Reviewer Details
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Your reviewer workspace and uploaded documents
                    </p>
                </div>

                {/* Reviewer Details Top Card */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-start dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="max-w-2xl space-y-1.5">
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {reviewer.subject}
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-100">
                            {reviewer.title}
                        </h2>
                        <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                            {reviewer.description ||
                                'Database concepts, SQL, and normalization materials for the midterm exam.'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                            <span>
                                Created {reviewer.createdAt || 'Oct 8, 2026'}
                            </span>
                            <span>·</span>
                            <span>
                                Last updated{' '}
                                {reviewer.updatedAt || 'Oct 10, 2026'}
                            </span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                {reviewer.status}
                            </span>
                            <span>·</span>
                            <span>{reviewer.documentsCount} documents</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                        className="h-9 shrink-0 gap-1.5 self-start px-3.5 text-xs text-neutral-700 dark:text-neutral-300"
                    >
                        <Plus className="size-3.5" />
                        Edit reviewer
                    </Button>
                </div>

                {/* 2-Column Workspace Grid */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    {/* Left Column: Uploaded Documents (5 cols) */}
                    <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs lg:col-span-5 dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    Uploaded documents
                                </h3>
                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                    {reviewer.documents?.length || 3} documents
                                    · 6.3 MB total
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1 px-2.5 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/50"
                            >
                                <Upload className="size-3.5" />
                                Upload document
                            </Button>
                        </div>

                        {/* List of uploaded documents */}
                        <div className="space-y-2.5">
                            {(reviewer.documents &&
                            reviewer.documents.length > 0
                                ? reviewer.documents
                                : mockReviewers[0].documents || []
                            ).map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-neutral-50/50 p-3.5 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/40"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200/80 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                            {doc.type === 'PPTX' ? (
                                                <Presentation className="size-4" />
                                            ) : (
                                                <FileText className="size-4" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                                {doc.name}
                                            </p>
                                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                                {doc.type} · {doc.size}
                                            </p>
                                        </div>
                                    </div>

                                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                                </div>
                            ))}
                        </div>

                        <p className="border-t border-neutral-100 pt-2 text-[11px] text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
                            Accepted formats: PDF, DOCX, PPTX.
                        </p>
                    </div>

                    {/* Right Column: Generated Reviewer Content (7 cols) */}
                    <div className="flex min-h-[460px] flex-col rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs lg:col-span-7 dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                Generated reviewer content
                            </h3>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                A dedicated space for the summary prepared from
                                your materials.
                            </p>
                        </div>

                        {/* Workspace Empty/Placeholder Box */}
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900/30">
                            <div className="mb-3 flex size-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-400 shadow-xs dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500">
                                <BookOpen className="size-6 text-blue-500" />
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                Reviewer content area
                            </h4>
                            <p className="mt-1 mb-4 max-w-sm text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Generated reviewer content will be displayed in
                                this workspace.
                            </p>
                            <span className="rounded-md bg-neutral-200/70 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wide text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                [CONTENT PLACEHOLDER]
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditReviewerModal
                reviewer={reviewer}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
            />
        </>
    );
}

ReviewerShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Reviewers', href: '/reviewers' },
        { title: 'Reviewer Details', href: '#' },
    ],
};
