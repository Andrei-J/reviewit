import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    FolderGit2,
    HelpCircle,
    LayoutGrid,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
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

const defaultNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
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
        href: '#',
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

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
                    items={isAdmin ? adminNavItems : defaultNavItems}
                    label={isAdmin ? 'WORKSPACE' : 'Platform'}
                />
            </SidebarContent>

            <SidebarFooter>
                {isAdmin ? (
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-3.5 mx-1 mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            <HelpCircle className="size-4 text-blue-600 dark:text-blue-400" />
                            <span>Need a hand?</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug mb-2">
                            Find guidance for managing your platform.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <span>Admin help center</span>
                            <ArrowRight className="size-3" />
                        </a>
                    </div>
                ) : (
                    <NavFooter items={footerNavItems} className="mt-auto" />
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
