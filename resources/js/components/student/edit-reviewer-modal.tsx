import { Edit3, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { subjectOptions } from '@/data/mock-reviewers';
import type { ReviewerItem } from '@/types/reviewer';

interface EditReviewerModalProps {
    reviewer: ReviewerItem | null;
    isOpen: boolean;
    onClose: () => void;
    onSave?: (updated: ReviewerItem) => void;
}

export function EditReviewerModal({
    reviewer,
    isOpen,
    onClose,
    onSave,
}: EditReviewerModalProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (reviewer) {
            setTitle(reviewer.title);
            setSubject(reviewer.subject);
            setDescription(reviewer.description || '');
        }
    }, [reviewer]);

    if (!reviewer) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            onSave({
                ...reviewer,
                title,
                subject,
                description,
            });
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="gap-0 p-6 sm:max-w-[480px]">
                <DialogHeader className="mb-5 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/60 dark:text-blue-400">
                            <Edit3 className="size-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                Edit Reviewer
                            </DialogTitle>
                            <DialogDescription className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Update the details for your {reviewer.title}.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Subject Field */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="edit-subject"
                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Subject <span className="text-red-500">*</span>
                        </Label>
                        <Select value={subject} onValueChange={setSubject}>
                            <SelectTrigger
                                id="edit-subject"
                                className="h-10 text-xs"
                            >
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjectOptions.map((opt) => (
                                    <SelectItem
                                        key={opt}
                                        value={opt}
                                        className="text-xs"
                                    >
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reviewer Name */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="edit-title"
                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Reviewer Name{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Midterm Reviewer"
                            className="h-10 text-xs"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="edit-description"
                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Description (optional)
                        </Label>
                        <textarea
                            id="edit-description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add notes or course topics covered..."
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs text-neutral-900 shadow-xs placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-100"
                        />
                    </div>

                    <p className="pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        Your {reviewer.documentsCount || 3} uploaded documents
                        will remain in this reviewer.
                    </p>

                    <div className="flex items-center justify-end gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
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
                            type="submit"
                            size="sm"
                            className="h-9 bg-blue-600 px-4 text-xs text-white hover:bg-blue-700"
                        >
                            Save changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
