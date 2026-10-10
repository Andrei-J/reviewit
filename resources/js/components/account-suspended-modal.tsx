import { AlertTriangle, Ban, Calendar, Mail, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface AccountSuspendedModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason?: string | null;
    bannedAt?: string | null;
    email?: string | null;
}

export function AccountSuspendedModal({
    isOpen,
    onClose,
    reason,
    bannedAt,
    email,
}: AccountSuspendedModalProps) {
    const defaultReason =
        'Repeated community guideline violations or administrative restriction';
    const displayReason = reason?.trim() ? reason : defaultReason;

    const appealMailto = `mailto:support@reviewit.test?subject=${encodeURIComponent(
        'ReviewIt Account Suspension Appeal',
    )}&body=${encodeURIComponent(
        `Hello ReviewIt Support Team,\n\nMy account (${email || 'registered email'}) has been suspended and I would like to request an appeal or clarification regarding this restriction.\n\nThank you.`,
    )}`;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="border-neutral-200 bg-white p-6 shadow-2xl sm:max-w-md sm:p-7 dark:border-neutral-800 dark:bg-neutral-900">
                <DialogHeader className="items-center gap-3 text-center">
                    {/* Glowing Rose Icon */}
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-rose-200/80 bg-rose-50 text-rose-600 shadow-xs dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-400">
                        <Ban className="size-7" />
                    </div>

                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Account Suspended
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                            Access to your ReviewIt account has been suspended
                            by an administrator.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="space-y-4 pt-1">
                    {/* Account Status Card */}
                    <div className="space-y-2 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-3.5 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-neutral-500 dark:text-neutral-400">
                                Status
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/60 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/60 dark:text-rose-400">
                                <span className="size-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                                Suspended
                            </span>
                        </div>

                        {email && (
                            <div className="flex items-center justify-between border-t border-neutral-200/50 pt-1 text-xs dark:border-neutral-800/60">
                                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                                    Account
                                </span>
                                <span className="max-w-[220px] truncate font-mono text-neutral-900 dark:text-neutral-200">
                                    {email}
                                </span>
                            </div>
                        )}

                        {bannedAt && (
                            <div className="flex items-center justify-between border-t border-neutral-200/50 pt-1 text-xs dark:border-neutral-800/60">
                                <span className="flex items-center gap-1 font-medium text-neutral-500 dark:text-neutral-400">
                                    <Calendar className="size-3 text-neutral-400" />
                                    Date Restricted
                                </span>
                                <span className="text-neutral-700 dark:text-neutral-300">
                                    {bannedAt}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Ban Reason Callout */}
                    <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-3.5 dark:border-amber-900/50 dark:bg-amber-950/30">
                        <div className="flex items-start gap-2.5">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <div className="space-y-1 text-xs">
                                <span className="block font-semibold text-amber-900 dark:text-amber-200">
                                    Reason for Suspension
                                </span>
                                <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
                                    {displayReason}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notice text */}
                    <p className="px-2 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                        Platform sign-in, notes, reviewers, and AI tools are
                        temporarily locked. If you believe this action was taken
                        in error, you can submit an appeal to support.
                    </p>
                </div>

                <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="w-full cursor-pointer text-xs font-medium sm:w-auto"
                    >
                        Close
                    </Button>

                    <Button
                        asChild
                        className="w-full cursor-pointer bg-rose-600 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-rose-700 active:bg-rose-800 sm:flex-1"
                    >
                        <a href={appealMailto}>
                            <Mail className="mr-1.5 size-3.5" />
                            Contact Support
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
