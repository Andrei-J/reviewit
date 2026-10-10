import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    HelpCircle,
    LayoutGrid,
    PlusCircle,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';

const studentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'My Reviewers',
        href: '/reviewers',
        icon: BookOpen,
    },
    {
        title: 'Create Reviewer',
        href: '/reviewers/create',
        icon: PlusCircle,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Reports',
        href: '#',
        icon: BarChart3,
    },
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.roles?.includes('admin');

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    items={isAdmin ? adminNavItems : studentNavItems}
                    label="WORKSPACE"
                />
            </SidebarContent>

            <SidebarFooter>
                <div className="mx-1 mb-2 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                        <HelpCircle className="size-4 text-blue-600 dark:text-blue-400" />
                        <span>Need a hand?</span>
                    </div>
                    <p className="mb-2 text-[11px] leading-snug text-neutral-500 dark:text-neutral-400">
                        {isAdmin
                            ? 'Find guidance for managing your platform.'
                            : 'Find guidance for creating and managing your reviewers.'}
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                        <span>
                            {isAdmin
                                ? 'Admin help center'
                                : 'Student help center'}
                        </span>
                        <ArrowRight className="size-3" />
                    </a>
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
