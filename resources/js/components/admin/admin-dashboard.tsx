import { usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Bell,
    BookOpen,
    Calendar,
    ChevronDown,
    Download,
    FileText,
    MoreHorizontal,
    Search,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserPlus,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import type { SharedData } from '@/types';

interface MaterialUpload {
    id: string;
    title: string;
    type: string;
    subject: string;
    uploadedBy: string;
    status: 'Completed' | 'Processing' | 'Failed';
    timeAgo: string;
}

const recentUploads: MaterialUpload[] = [
    {
        id: '1',
        title: 'Cell Biology — Chapter 4',
        type: 'PDF',
        subject: 'Biology',
        uploadedBy: 'Emma Wilson',
        status: 'Completed',
        timeAgo: '2 min ago',
    },
    {
        id: '2',
        title: 'Macroeconomics Notes',
        type: 'DOCX',
        subject: 'Economics',
        uploadedBy: 'Liam Chen',
        status: 'Completed',
        timeAgo: '8 min ago',
    },
    {
        id: '3',
        title: 'Mechanics Lecture 06',
        type: 'PPTX',
        subject: 'Physics',
        uploadedBy: 'Sofia Patel',
        status: 'Processing',
        timeAgo: '12 min ago',
    },
    {
        id: '4',
        title: 'Probability & Statistics',
        type: 'PDF',
        subject: 'Mathematics',
        uploadedBy: 'Noah Garcia',
        status: 'Failed',
        timeAgo: '18 min ago',
    },
];

const chartData = [
    { label: 'Sep 30', aiGen: 180, materials: 140 },
    { label: 'Oct 1', aiGen: 260, materials: 180 },
    { label: 'Oct 2', aiGen: 220, materials: 120 },
    { label: 'Oct 3', aiGen: 380, materials: 220 },
    { label: 'Oct 4', aiGen: 450, materials: 280 },
    { label: 'Oct 5', aiGen: 310, materials: 210 },
    { label: 'Oct 6', aiGen: 520, materials: 270 },
];

export function AdminDashboard() {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const [selectedRange, setSelectedRange] = useState('Oct 1 – 6, 2026');
    const [chartTimeframe, setChartTimeframe] = useState('Last 7 days');

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
            {/* Top Bar with Header, Search and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        Dashboard
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Overview of your ReviewIt platform
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search Platform Input */}
                    <div className="relative flex items-center w-full md:w-64">
                        <Search className="absolute left-3 size-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search platform..."
                            className="h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-9 pr-12 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <kbd className="absolute right-2.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
                            ⌘ K
                        </kbd>
                    </div>

                    {/* Notification Bell */}
                    <button
                        type="button"
                        className="relative flex size-9 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors"
                        title="Notifications"
                    >
                        <Bell className="size-4" />
                        <span className="absolute top-2 right-2 size-1.5 rounded-full bg-blue-600" />
                    </button>

                    {/* Admin Avatar Circle */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-xs ring-2 ring-white dark:ring-neutral-900">
                        {getInitials(auth.user?.name || 'Admin')}
                    </div>
                </div>
            </div>

            {/* Platform at a Glance Section */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            Platform at a glance
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                            Your community, content and AI activity this month.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 shadow-xs"
                        >
                            <Calendar className="size-3.5 text-neutral-500" />
                            <span>{selectedRange}</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 shadow-xs"
                        >
                            <Download className="size-3.5 text-neutral-500" />
                            <span>Export report</span>
                        </button>
                    </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat 1: Total Users */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                Total Users
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Users className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                1,248
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+12.5% this month</span>
                        </div>
                    </div>

                    {/* Stat 2: Active Reviewers */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                Active Reviewers
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <BookOpen className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                486
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+8.2% this month</span>
                        </div>
                    </div>

                    {/* Stat 3: Materials Uploaded */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                Materials Uploaded
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <FileText className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                3,672
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+18.4% this month</span>
                        </div>
                    </div>

                    {/* Stat 4: AI Generations */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                AI Generations
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Sparkles className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                8,946
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+24.6% this month</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle Grid: Platform Usage & Recent Uploads (Left), AI Health & Activity (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (2 Cols wide) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Platform Usage Chart Card */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    Platform usage
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Learning content created across the platform
                                </p>
                            </div>

                            <button
                                type="button"
                                className="inline-flex self-start sm:self-auto items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50"
                            >
                                <span>{chartTimeframe}</span>
                                <ChevronDown className="size-3.5 text-neutral-400" />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 flex items-center gap-6 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-blue-600" />
                                <span className="text-neutral-500 dark:text-neutral-400">AI generations</span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">1,986</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                                <span className="text-neutral-500 dark:text-neutral-400">Materials uploaded</span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">823</span>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="mt-6 h-60 w-full relative">
                            {/* Y Axis Guide Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400">
                                <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-1">
                                    <span>600</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-1">
                                    <span>400</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-1">
                                    <span>200</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-700 pb-1">
                                    <span>0</span>
                                </div>
                            </div>

                            {/* SVG Chart with Bars & Wave Line */}
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 210" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                                    </linearGradient>
                                </defs>

                                {/* Bar columns for Materials Uploaded */}
                                {chartData.map((d, i) => {
                                    const x = 30 + i * 105;
                                    const barHeight = (d.materials / 600) * 170;
                                    const y = 190 - barHeight;
                                    return (
                                        <rect
                                            key={`bar-${d.label}`}
                                            x={x + 12}
                                            y={y}
                                            width="14"
                                            height={barHeight}
                                            rx="3"
                                            className="fill-slate-300 dark:fill-slate-700/60"
                                        />
                                    );
                                })}

                                {/* Area under AI Generation curve */}
                                <path
                                    d="M 30,145 C 80,125 100,120 135,115 C 180,110 200,135 240,125 C 285,110 310,80 345,75 C 390,70 410,105 450,85 C 490,65 520,115 555,100 C 600,80 630,40 670,35 L 670,190 L 30,190 Z"
                                    fill="url(#aiGradient)"
                                />

                                {/* Smooth AI Generation Curve */}
                                <path
                                    d="M 30,145 C 80,125 100,120 135,115 C 180,110 200,135 240,125 C 285,110 310,80 345,75 C 390,70 410,105 450,85 C 490,65 520,115 555,100 C 600,80 630,40 670,35"
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="3.2"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* X Axis Labels */}
                            <div className="mt-2 flex justify-between px-2 text-[11px] text-neutral-400">
                                {chartData.map((d) => (
                                    <span key={d.label}>{d.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Uploads Table Card */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs">
                        <div className="flex items-center justify-between pb-3">
                            <div>
                                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    Recent uploads
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Latest student materials and processing status
                                </p>
                            </div>

                            <a
                                href="#"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <span>View all uploads</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                                        <th className="py-3 px-2">Material</th>
                                        <th className="py-3 px-2">Uploaded By</th>
                                        <th className="py-3 px-2">Status</th>
                                        <th className="py-3 px-2">Uploaded</th>
                                        <th className="py-3 px-2 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                                    {recentUploads.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
                                        >
                                            <td className="py-3.5 px-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                                                        <FileText className="size-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-[11px] text-neutral-500">
                                                            {item.type} • {item.subject}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-2 text-neutral-700 dark:text-neutral-300">
                                                {item.uploadedBy}
                                            </td>
                                            <td className="py-3.5 px-2">
                                                {item.status === 'Completed' && (
                                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60">
                                                        Completed
                                                    </span>
                                                )}
                                                {item.status === 'Processing' && (
                                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60">
                                                        Processing
                                                    </span>
                                                )}
                                                {item.status === 'Failed' && (
                                                    <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60">
                                                        Failed
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-2 text-neutral-500 dark:text-neutral-400">
                                                {item.timeAgo}
                                            </td>
                                            <td className="py-3.5 px-2 text-right">
                                                <button
                                                    type="button"
                                                    className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                                                >
                                                    <MoreHorizontal className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="mt-3 flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                            <span className="text-neutral-500 dark:text-neutral-400">
                                4 latest of 3,672 materials
                            </span>
                            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                                <AlertCircle className="size-3.5" />
                                <span>1 upload needs review</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (1 Col wide) */}
                <div className="flex flex-col gap-6">
                    {/* AI Processing Health Card */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                AI processing health
                            </h3>
                            <button
                                type="button"
                                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                            >
                                <MoreHorizontal className="size-4" />
                            </button>
                        </div>

                        {/* Operational Status */}
                        <div className="mt-3 flex items-center gap-2">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                All systems operational
                            </span>
                        </div>

                        {/* Success Rate & Avg Time Stats */}
                        <div className="mt-5 grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                    99.2%
                                </span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    Success rate - 24h
                                </p>
                            </div>
                            <div>
                                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                    18.4s
                                </span>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    Avg. generation time
                                </p>
                            </div>
                        </div>

                        {/* Processing Queue */}
                        <div className="mt-5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                                    Processing queue
                                </span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    12 / 50 jobs
                                </span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full w-[24%]" />
                            </div>
                            <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                                8 processing • 4 waiting
                            </p>
                        </div>

                        {/* Action Link */}
                        <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            <a
                                href="#"
                                className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <span>View processing logs</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                Recent activity
                            </h3>
                            <button
                                type="button"
                                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                            >
                                <MoreHorizontal className="size-4" />
                            </button>
                        </div>

                        {/* Activity Items */}
                        <div className="mt-4 flex flex-col gap-4">
                            {/* Item 1 */}
                            <div className="flex items-start gap-3">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mt-0.5">
                                    <UserPlus className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        New student registered
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Ava Thompson - University of Bristol
                                    </p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5">5 min ago</p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-start gap-3">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 mt-0.5">
                                    <Sparkles className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        Biology reviewer generated
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Emma Wilson • 24 practice questions
                                    </p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5">7 min ago</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-start gap-3">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 mt-0.5">
                                    <AlertCircle className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        Upload requires attention
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Noah Garcia • Password-protected PDF
                                    </p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5">18 min ago</p>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex items-start gap-3">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mt-0.5">
                                    <ShieldCheck className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        User access updated
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Alex Morgan - Restored student account
                                    </p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5">32 min ago</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Link */}
                        <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            <a
                                href="#"
                                className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <span>View audit log</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Community Banner */}
            <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <Users className="size-5.5" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                Keep your learning community in good hands
                            </h4>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                Manage student accounts, review access and invite new administrators.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 shadow-xs"
                        >
                            <Users className="size-3.5 text-neutral-500" />
                            <span>Manage users</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs transition-colors"
                        >
                            <span>+ Invite administrator</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
