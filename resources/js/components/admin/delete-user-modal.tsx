import { router } from '@inertiajs/react';
import { AlertCircle, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import type { User } from '@/types';

interface DeleteUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DeleteUserModal({
    user,
    isOpen,
    onClose,
}: DeleteUserModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !user) {
        return null;
    }

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        setIsDeleting(true);

        router.delete(`/admin/users/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
                onClose();
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-md animate-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl duration-150 zoom-in-95 fade-in dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-400">
                            <Trash2 className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                                Delete {user.name}?
                            </h3>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                This will remove the account. Study files and
                                test history will be soft-deleted.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200/60 bg-rose-50/50 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <p className="text-xs text-rose-800 dark:text-rose-300">
                        User <span className="font-semibold">{user.email}</span>{' '}
                        will immediately lose all platform access and active
                        sessions will be terminated.
                    </p>
                </div>

                <form
                    onSubmit={handleDelete}
                    className="mt-6 flex items-center justify-end gap-2.5"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50"
                    >
                        <Trash2 className="size-3.5" />
                        {isDeleting ? 'Deleting...' : 'Delete user'}
                    </button>
                </form>
            </div>
        </div>
    );
}
