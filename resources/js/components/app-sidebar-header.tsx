import { usePage } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.roles?.includes('admin');
    const getInitials = useInitials();

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative hidden w-48 items-center sm:flex md:w-64">
                    <Search className="absolute left-3 size-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder={
                            isAdmin
                                ? 'Search platform...'
                                : 'Search reviewers...'
                        }
                        className="h-9 w-full rounded-lg border border-neutral-200 bg-white pr-12 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                    />
                    <kbd className="absolute right-2.5 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800">
                        ⌘ K
                    </kbd>
                </div>

                {/* Notification Bell */}
                <button
                    type="button"
                    className="relative flex size-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    title="Notifications"
                >
                    <Bell className="size-4" />
                    <span className="absolute top-2 right-2 size-1.5 rounded-full bg-blue-600" />
                </button>

                {/* User Profile Avatar with Dropdown Menu */}
                {auth?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 ring-2 ring-white transition-opacity hover:opacity-90 focus:outline-none dark:bg-blue-950/80 dark:text-blue-300 dark:ring-neutral-900"
                            >
                                {getInitials(auth.user?.name || 'User')}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 ring-2 ring-white dark:ring-neutral-900">
                        {getInitials('Admin')}
                    </div>
                )}
            </div>
        </header>
    );
}
