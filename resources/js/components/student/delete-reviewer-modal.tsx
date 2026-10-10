import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { ReviewerItem } from '@/types/reviewer';

interface DeleteReviewerModalProps {
    reviewer: ReviewerItem | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (reviewerId: string | number) => void;
}

export function DeleteReviewerModal({
    reviewer,
    isOpen,
    onClose,
    onConfirm,
}: DeleteReviewerModalProps) {
    if (!reviewer) return null;

    const handleDelete = () => {
        if (onConfirm) {
            onConfirm(reviewer.id);
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="gap-0 p-6 sm:max-w-[480px]">
                <DialogHeader className="mb-5 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/60 dark:text-red-400">
                            <Trash2 className="size-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                Delete {reviewer.title}?
                            </DialogTitle>
                            <DialogDescription className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                This will permanently remove this reviewer from
                                ReviewIt. This action cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Reviewer Details Box */}
                <div className="mb-4 space-y-1 rounded-lg border border-neutral-200 bg-neutral-50/50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/40">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {reviewer.title}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {reviewer.subject}
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            {reviewer.status}
                        </span>
                        <span>•</span>
                        <span>{reviewer.documentsCount} documents</span>
                        <span>•</span>
                        <span>{reviewer.updatedAt}</span>
                    </div>
                </div>

                {/* Red Warning Banner */}
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50/60 p-3 dark:border-red-900/50 dark:bg-red-950/30">
                    <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                        Reviewer and uploaded documents will be deleted
                    </p>
                    <p className="mt-0.5 text-[11px] text-red-600 dark:text-red-400">
                        This includes all {reviewer.documentsCount} uploaded
                        materials and the generated reviewer content.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                        Permanent action
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onClose}
                            className="h-9 px-4 text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleDelete}
                            className="inline-flex h-9 items-center gap-1.5 bg-red-600 px-4 text-xs font-medium text-white hover:bg-red-700"
                        >
                            <Trash2 className="size-3.5" />
                            Delete Reviewer
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
