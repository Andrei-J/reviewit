import { Head, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import type { SharedData } from '@/types';

export default function StudentSettings() {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const fullName = auth?.user?.name || 'Emma Wilson';
    const names = fullName.split(' ');
    const [firstName, setFirstName] = useState(names[0] || 'Emma');
    const [lastName, setLastName] = useState(
        names.slice(1).join(' ') || 'Wilson',
    );
    const [email, setEmail] = useState(
        auth?.user?.email || 'emma.wilson@uni.edu',
    );

    // Password fields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // UI only mock save
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // UI only mock save
    };

    const handleSignOut = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title="Settings" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Manage your student profile and account
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left 2 Columns: Profile & Password */}
                    <div className="space-y-6 lg:col-span-2">
                        <div>
                            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                Profile and account
                            </h2>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Keep your personal information up to date.
                            </p>
                        </div>

                        {/* Card 1: Profile Information */}
                        <div className="space-y-6 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <h3 className="text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                Profile information
                            </h3>

                            {/* Avatar header row */}
                            <div className="flex items-center gap-3.5">
                                <Avatar className="size-12 border border-blue-100 dark:border-blue-900">
                                    <AvatarFallback className="bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                        {getInitials(fullName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                        {fullName}
                                    </h4>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        Student · {email}
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleProfileSubmit}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="first-name"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            First name
                                        </Label>
                                        <Input
                                            id="first-name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            className="h-10 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="last-name"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            Last name
                                        </Label>
                                        <Input
                                            id="last-name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            className="h-10 text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="email"
                                        className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                    >
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="h-10 text-xs"
                                    />
                                    <p className="pt-0.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                                        This email is used to sign in to your
                                        ReviewIt account.
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-4 text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="h-9 bg-blue-600 px-4 text-xs font-medium text-white hover:bg-blue-700"
                                    >
                                        Save changes
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Card 2: Change Password */}
                        <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div>
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    Change password
                                </h3>
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                    Choose a secure password to protect your
                                    account.
                                </p>
                            </div>

                            <form
                                onSubmit={handlePasswordSubmit}
                                className="space-y-4 pt-1"
                            >
                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="current-password"
                                        className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                    >
                                        Current password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        placeholder="••••••••••••"
                                        className="h-10 text-xs"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="new-password"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            New password
                                        </Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            placeholder="Enter a new password"
                                            className="h-10 text-xs"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="confirm-password"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            Confirm new password
                                        </Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Re-enter new password"
                                            className="h-10 text-xs"
                                        />
                                    </div>
                                </div>

                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                    Use at least 8 characters.
                                </p>

                                <div className="flex items-center justify-end border-t border-neutral-100 pt-3 dark:border-neutral-800">
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="h-9 px-4 text-xs font-medium"
                                    >
                                        Update password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Your Account */}
                    <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            Your account
                        </h3>

                        <div>
                            <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
                                Student account
                            </span>
                        </div>

                        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                            Your reviewers and uploaded materials are linked to
                            this account.
                        </p>

                        <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                            Member since Oct 6, 2026
                        </p>

                        <div className="pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                                className="h-9 w-full gap-1.5 text-xs text-neutral-700 hover:border-red-200 hover:text-red-600 dark:text-neutral-300 dark:hover:text-red-400"
                            >
                                <LogOut className="size-3.5" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

StudentSettings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Settings', href: '/settings' },
    ],
};
