import { router } from '@inertiajs/react';
import { AlertTriangle, Ban, Check, Shield, X } from 'lucide-react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

interface BanUserModalProps {
    user: User | null;
    adminName: string;
    isOpen: boolean;
    onClose: () => void;
}

const banReasons = [
    'Repeated community guideline violations',
    'Suspicious or automated account activity',
    'Inappropriate study material uploads',
    'Academic integrity or test policy breach',
    'User request or temporary restriction',
];

export function BanUserModal({
    user,
    adminName,
    isOpen,
    onClose,
}: BanUserModalProps) {
    const getInitials = useInitials();
    const [reason, setReason] = useState(banReasons[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !user) {
        return null;
    }

    const handleConfirmBan = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post(
            `/admin/users/${user.id}/ban`,
            { reason },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onClose();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Dialog */}
            <div className="relative z-10 w-full max-w-lg animate-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl duration-150 zoom-in-95 fade-in sm:p-7 dark:border-neutral-800 dark:bg-neutral-900">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-amber-200/60 bg-amber-50 text-amber-600 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-400">
                            <Ban className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                                Ban {user.name}?
                            </h3>
                            <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                                Restrict this user's access to ReviewIt. Their
                                account and learning data will be kept.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* User Card Preview */}
                <div className="mt-5 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
                            {getInitials(user.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                {user.name}
                            </div>
                            <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                                {user.email}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium ${
                                        user.plan === 'premium'
                                            ? 'border border-blue-200/60 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                                            : 'border border-neutral-200 bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                    }`}
                                >
                                    {user.plan === 'premium'
                                        ? 'Premium'
                                        : 'Free'}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                    <span className="size-1.5 rounded-full bg-emerald-600" />
                                    Active
                                </span>
                                <span className="inline-flex items-center rounded border border-neutral-200 bg-white px-2 py-0.5 font-mono text-[11px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                                    {user.code || `USR-${user.id}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Consequences List */}
                <div className="mt-4 space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span>
                            Sign-in and active sessions will be blocked
                            immediately.
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span>
                            Uploads, reviewers and progress will be preserved.
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span>You can restore access later using Unban.</span>
                    </div>
                </div>

                {/* Reason Field */}
                <form onSubmit={handleConfirmBan} className="mt-5 space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            Reason for ban *
                        </label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                            required
                        >
                            {banReasons.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                            Required for the audit log. Visible to
                            administrators only.
                        </p>
                    </div>

                    {/* Warning Callout */}
                    <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/30">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
                            Banning does not change the Premium plan or cancel
                            billing. Manage the subscription separately.
                        </p>
                    </div>

                    {/* Audit Trail Note */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <Shield className="size-3 text-neutral-400" />
                        <span>
                            This action will be recorded under {adminName} in
                            the audit log.
                        </span>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Access can be restored
                        </span>
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="rounded-lg border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50"
                            >
                                <Ban className="size-3.5" />
                                {isSubmitting ? 'Banning...' : 'Ban user'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
