import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Ban,
    Check,
    ChevronDown,
    Crown,
    Download,
    Eye,
    RotateCcw,
    Search,
    Shield,
    Trash2,
    UserCheck,
    Users as UsersIcon,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { BanUserModal } from '@/components/admin/ban-user-modal';
import { DeleteUserModal } from '@/components/admin/delete-user-modal';
import { useInitials } from '@/hooks/use-initials';
import type { CommunityStats, PaginatedData, SharedData, User } from '@/types';

interface UsersPageProps {
    users: PaginatedData<User>;
    filters: {
        search?: string | null;
        status?: string | null;
        plan?: string | null;
        sort?: string | null;
    };
    stats: CommunityStats;
    perPage: number;
}

export default function UsersIndex({
    users,
    filters,
    stats,
    perPage,
}: UsersPageProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    // Filters state
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [planFilter, setPlanFilter] = useState(filters.plan || 'all');
    const [sortFilter, setSortFilter] = useState(filters.sort || 'newest');
    const [selectedPerPage, setSelectedPerPage] = useState(perPage.toString());

    // Modals state
    const [banTarget, setBanTarget] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    // Apply filters via Inertia visit
    const applyFilters = (overrides: Record<string, string>) => {
        const queryParams = {
            search: search.trim() || undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            plan: planFilter !== 'all' ? planFilter : undefined,
            sort: sortFilter !== 'newest' ? sortFilter : undefined,
            per_page: selectedPerPage !== '10' ? selectedPerPage : undefined,
            ...overrides,
        };

        // Clean out undefined or empty keys
        const cleaned: Record<string, string> = {};
        Object.entries(queryParams).forEach(([k, v]) => {
            if (v !== undefined && v !== '') {
                cleaned[k] = v;
            }
        });

        router.get('/admin/users', cleaned, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                applyFilters({ search: search.trim() || '' });
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    const handleTabChange = (status: string) => {
        setStatusFilter(status);
        applyFilters({ status: status === 'all' ? '' : status });
    };

    const handlePlanChange = (plan: string) => {
        setPlanFilter(plan);
        applyFilters({ plan: plan === 'all' ? '' : plan });
    };

    const handleStatusDropdownChange = (status: string) => {
        setStatusFilter(status);
        applyFilters({ status: status === 'all' ? '' : status });
    };

    const handleSortChange = (sort: string) => {
        setSortFilter(sort);
        applyFilters({ sort: sort === 'newest' ? '' : sort });
    };

    const handlePerPageChange = (val: string) => {
        setSelectedPerPage(val);
        applyFilters({ per_page: val });
    };

    const handleUnban = (user: User) => {
        if (confirm(`Restore platform access for ${user.name}?`)) {
            router.post(
                `/admin/users/${user.id}/unban`,
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    // Format date string
    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
            <Head title="Users Management" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                    Users
                </h1>
                <p className="mt-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                    Manage your ReviewIt community and account access
                </p>
            </div>

            {/* Section 1: Your community at a glance */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-neutral-100">
                            Your community at a glance
                        </h2>
                        <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                            Account status and subscription plans in one place.
                        </p>
                    </div>

                    {/* Export Users Action */}
                    <a
                        href={`/admin/users/export?status=${statusFilter}&plan=${planFilter}`}
                        download
                        className="inline-flex items-center gap-2 self-start rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 sm:self-auto dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                        <Download className="size-3.5 text-neutral-500" />
                        <span>Export users</span>
                    </a>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Users */}
                    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Total users
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                <UsersIcon className="size-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                {stats.total.toLocaleString()}
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                All registered student accounts
                            </p>
                        </div>
                    </div>

                    {/* Active Users */}
                    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Active users
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                <UserCheck className="size-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                {stats.active.toLocaleString()}
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                Accounts with platform access
                            </p>
                        </div>
                    </div>

                    {/* Banned Users */}
                    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Banned users
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                                <Ban className="size-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                {stats.banned.toLocaleString()}
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                Accounts with restricted access
                            </p>
                        </div>
                    </div>

                    {/* Premium Users */}
                    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Premium users
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Crown className="size-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                {stats.premium.toLocaleString()}
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                {stats.free.toLocaleString()} users on the Free
                                plan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: All Users Table & Toolbar */}
            <section className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                {/* Header with Title and Admin Session badge */}
                <div className="border-b border-neutral-100 p-5 sm:p-6 dark:border-neutral-800">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-neutral-100">
                                All users
                            </h2>
                        </div>
                    </div>

                    {/* Filter Tabs: All / Active / Banned */}
                    <div className="mt-5 -mb-5 flex items-center gap-2 border-b border-neutral-100 pb-px sm:-mb-6 dark:border-neutral-800">
                        <button
                            type="button"
                            onClick={() => handleTabChange('all')}
                            className={`border-b-2 pb-3 text-xs font-semibold transition-colors ${
                                statusFilter === 'all'
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                        >
                            All users{' '}
                            <span className="ml-1 rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                {stats.total}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange('active')}
                            className={`border-b-2 pb-3 text-xs font-semibold transition-colors ${
                                statusFilter === 'active'
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                        >
                            Active{' '}
                            <span className="ml-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                {stats.active}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange('banned')}
                            className={`border-b-2 pb-3 text-xs font-semibold transition-colors ${
                                statusFilter === 'banned'
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                        >
                            Banned{' '}
                            <span className="ml-1 rounded-full bg-rose-50 px-1.5 py-0.5 text-[10px] text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                                {stats.banned}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="flex flex-col items-stretch justify-between gap-3 border-b border-neutral-100 bg-neutral-50/50 p-4 sm:p-5 md:flex-row md:items-center dark:border-neutral-800 dark:bg-neutral-900/40">
                    {/* Search Input */}
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="h-9 w-full rounded-lg border border-neutral-200 bg-white pr-8 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Dropdowns */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Plan Dropdown */}
                        <div className="relative">
                            <select
                                value={planFilter}
                                onChange={(e) =>
                                    handlePlanChange(e.target.value)
                                }
                                className="h-9 cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white pr-8 pl-3 text-xs text-neutral-700 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                            >
                                <option value="all">Plan: All plans</option>
                                <option value="free">Plan: Free</option>
                                <option value="premium">Plan: Premium</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-neutral-400" />
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    handleStatusDropdownChange(e.target.value)
                                }
                                className="h-9 cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white pr-8 pl-3 text-xs text-neutral-700 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                            >
                                <option value="all">
                                    Status: All statuses
                                </option>
                                <option value="active">Status: Active</option>
                                <option value="banned">Status: Banned</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-neutral-400" />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortFilter}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)
                                }
                                className="h-9 cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white pr-8 pl-3 text-xs text-neutral-700 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                            >
                                <option value="newest">
                                    Sort: Newest first
                                </option>
                                <option value="oldest">
                                    Sort: Oldest first
                                </option>
                                <option value="name_asc">
                                    Sort: Name (A-Z)
                                </option>
                                <option value="name_desc">
                                    Sort: Name (Z-A)
                                </option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-neutral-400" />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-400">
                                <th className="px-5 py-3 sm:px-6">USER</th>
                                <th className="px-4 py-3">EMAIL</th>
                                <th className="px-4 py-3">PLAN</th>
                                <th className="px-4 py-3">STATUS</th>
                                <th className="px-4 py-3">JOINED</th>
                                <th className="px-5 py-3 text-right sm:px-6">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-xs dark:divide-neutral-800">
                            {users.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-neutral-500 dark:text-neutral-400"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <UsersIcon className="size-8 text-neutral-300 dark:text-neutral-600" />
                                            <p className="font-medium">
                                                No users match your criteria
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch('');
                                                    setStatusFilter('all');
                                                    setPlanFilter('all');
                                                    applyFilters({
                                                        search: '',
                                                        status: '',
                                                        plan: '',
                                                    });
                                                }}
                                                className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Clear filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.data.map((user) => {
                                    const isBanned =
                                        !!user.banned_at ||
                                        user.status === 'banned';
                                    const isPremium = user.plan === 'premium';

                                    return (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                        >
                                            {/* User with Avatar and ID */}
                                            <td className="px-5 py-3.5 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-xs font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300">
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="truncate font-semibold text-neutral-900 dark:text-neutral-100">
                                                            {user.name}
                                                        </div>
                                                        <div className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                                                            {user.code ||
                                                                `USR-${user.id}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-4 py-3.5 text-neutral-600 dark:text-neutral-300">
                                                {user.email}
                                            </td>

                                            {/* Plan Badge */}
                                            <td className="px-4 py-3.5">
                                                <span
                                                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${
                                                        isPremium
                                                            ? 'border-blue-200/70 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                                                            : 'border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                                                    }`}
                                                >
                                                    {isPremium
                                                        ? 'Premium'
                                                        : 'Free'}
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-3.5">
                                                {isBanned ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-rose-200/70 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                                                        <span className="size-1.5 rounded-full bg-rose-600" />
                                                        Banned
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-200/70 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                        <span className="size-1.5 rounded-full bg-emerald-600" />
                                                        Active
                                                    </span>
                                                )}
                                            </td>

                                            {/* Joined Date */}
                                            <td className="px-4 py-3.5 text-neutral-500 dark:text-neutral-400">
                                                {formatDate(user.created_at)}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="px-5 py-3.5 text-right sm:px-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    {isBanned ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleUnban(
                                                                    user,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                                                            title="Restore account access"
                                                        >
                                                            <RotateCcw className="size-3.5" />
                                                            Unban
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setBanTarget(
                                                                    user,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50"
                                                            title="Ban user"
                                                        >
                                                            <Ban className="size-3.5" />
                                                            Ban
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                user,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination & Footer */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-100 p-4 text-xs text-neutral-500 sm:flex-row sm:p-5 dark:border-neutral-800 dark:text-neutral-400">
                    <div className="flex items-center gap-4">
                        <span>
                            Showing {users.from || 0}–{users.to || 0} of{' '}
                            {users.total} users
                        </span>

                        {/* Rows per page */}
                        <div className="flex items-center gap-1.5">
                            <select
                                value={selectedPerPage}
                                onChange={(e) =>
                                    handlePerPageChange(e.target.value)
                                }
                                className="h-7 rounded border border-neutral-200 bg-white px-2 text-xs text-neutral-700 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            >
                                <option value="10">10 per page</option>
                                <option value="25">25 per page</option>
                                <option value="50">50 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* Pagination Links */}
                    {users.links.length > 3 && (
                        <div className="flex items-center gap-1">
                            {users.links.map((link, idx) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={idx}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="cursor-not-allowed rounded px-2.5 py-1 text-xs text-neutral-400 opacity-60"
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Bottom Audit Log Banner */}
                <div className="flex flex-col justify-between gap-2 border-t border-neutral-100 bg-neutral-50/70 px-5 py-3.5 text-[11px] text-neutral-500 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="size-3.5 text-neutral-400" />
                        <span>
                            Banning restricts access without deleting data. All
                            account changes are recorded in the audit log.
                        </span>
                    </div>
                    <Link
                        href="#"
                        className="flex items-center gap-1 self-start font-semibold text-blue-600 hover:underline sm:self-auto dark:text-blue-400"
                    >
                        View audit log <ArrowRight className="size-3" />
                    </Link>
                </div>
            </section>

            {/* Modals */}
            <BanUserModal
                isOpen={!!banTarget}
                user={banTarget}
                adminName={auth.user?.name || 'Administrator'}
                onClose={() => setBanTarget(null)}
            />

            <DeleteUserModal
                isOpen={!!deleteTarget}
                user={deleteTarget}
                onClose={() => setDeleteTarget(null)}
            />
        </div>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/admin/users',
        },
    ],
};
