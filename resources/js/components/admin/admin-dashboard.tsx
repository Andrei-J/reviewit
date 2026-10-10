import { usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    BookOpen,
    Calendar,
    ChevronDown,
    Download,
    FileText,
    MoreHorizontal,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserPlus,
    Users,
} from 'lucide-react';
import { useState } from 'react';
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
    const [selectedRange, setSelectedRange] = useState('Oct 1 – 6, 2026');
    const [chartTimeframe, setChartTimeframe] = useState('Last 7 days');

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Overview of your ReviewIt platform
                </p>
            </div>

            {/* Platform at a Glance Section */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-neutral-100">
                            Platform at a glance
                        </h2>
                        <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                            Your community, content and AI activity this month.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-xs hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                        >
                            <Calendar className="size-3.5 text-neutral-500" />
                            <span>{selectedRange}</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-xs hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                        >
                            <Download className="size-3.5 text-neutral-500" />
                            <span>Export report</span>
                        </button>
                    </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Stat 1: Total Users */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                                Total Users
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Users className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                                1,248
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+12.5% this month</span>
                        </div>
                    </div>

                    {/* Stat 2: Active Reviewers */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                                Active Reviewers
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <BookOpen className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                                486
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+8.2% this month</span>
                        </div>
                    </div>

                    {/* Stat 3: Materials Uploaded */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                                Materials Uploaded
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <FileText className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                                3,672
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="size-3.5" />
                            <span>+18.4% this month</span>
                        </div>
                    </div>

                    {/* Stat 4: AI Generations */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                                AI Generations
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Sparkles className="size-4.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
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
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column (2 Cols wide) */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    {/* Platform Usage Chart Card */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
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
                                className="inline-flex items-center gap-1.5 self-start rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50 sm:self-auto dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                            >
                                <span>{chartTimeframe}</span>
                                <ChevronDown className="size-3.5 text-neutral-400" />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 flex items-center gap-6 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-blue-600" />
                                <span className="text-neutral-500 dark:text-neutral-400">
                                    AI generations
                                </span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    1,986
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                                <span className="text-neutral-500 dark:text-neutral-400">
                                    Materials uploaded
                                </span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    823
                                </span>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative mt-6 h-60 w-full">
                            {/* Y Axis Guide Lines */}
                            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between text-[10px] text-neutral-400">
                                <div className="flex items-center gap-2 border-b border-neutral-100 pb-1 dark:border-neutral-800/80">
                                    <span>600</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-100 pb-1 dark:border-neutral-800/80">
                                    <span>400</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-100 pb-1 dark:border-neutral-800/80">
                                    <span>200</span>
                                </div>
                                <div className="flex items-center gap-2 border-b border-neutral-200 pb-1 dark:border-neutral-700">
                                    <span>0</span>
                                </div>
                            </div>

                            {/* SVG Chart with Bars & Wave Line */}
                            <svg
                                className="h-full w-full overflow-visible"
                                viewBox="0 0 700 210"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <linearGradient
                                        id="aiGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#3B82F6"
                                            stopOpacity="0.25"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#3B82F6"
                                            stopOpacity="0.0"
                                        />
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
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between pb-3">
                            <div>
                                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    Recent uploads
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Latest student materials and processing
                                    status
                                </p>
                            </div>

                            <a
                                href="#"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <span>View all uploads</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-neutral-100 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase dark:border-neutral-800">
                                        <th className="px-2 py-3">Material</th>
                                        <th className="px-2 py-3">
                                            Uploaded By
                                        </th>
                                        <th className="px-2 py-3">Status</th>
                                        <th className="px-2 py-3">Uploaded</th>
                                        <th className="px-2 py-3 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 font-medium dark:divide-neutral-800/60">
                                    {recentUploads.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-2 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
                                                        <FileText className="size-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-[11px] text-neutral-500">
                                                            {item.type} •{' '}
                                                            {item.subject}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-3.5 text-neutral-700 dark:text-neutral-300">
                                                {item.uploadedBy}
                                            </td>
                                            <td className="px-2 py-3.5">
                                                {item.status ===
                                                    'Completed' && (
                                                    <span className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                                                        Completed
                                                    </span>
                                                )}
                                                {item.status ===
                                                    'Processing' && (
                                                    <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                                        Processing
                                                    </span>
                                                )}
                                                {item.status === 'Failed' && (
                                                    <span className="inline-flex items-center rounded-full border border-rose-200/60 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                                                        Failed
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-2 py-3.5 text-neutral-500 dark:text-neutral-400">
                                                {item.timeAgo}
                                            </td>
                                            <td className="px-2 py-3.5 text-right">
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
                        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs dark:border-neutral-800">
                            <span className="text-neutral-500 dark:text-neutral-400">
                                4 latest of 3,672 materials
                            </span>
                            <div className="flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                                <AlertCircle className="size-3.5" />
                                <span>1 upload needs review</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (1 Col wide) */}
                <div className="flex flex-col gap-6">
                    {/* AI Processing Health Card */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
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
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                    Success rate - 24h
                                </p>
                            </div>
                            <div>
                                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                                    18.4s
                                </span>
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                    Avg. generation time
                                </p>
                            </div>
                        </div>

                        {/* Processing Queue */}
                        <div className="mt-5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                                    Processing queue
                                </span>
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    12 / 50 jobs
                                </span>
                            </div>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <div className="h-full w-[24%] rounded-full bg-blue-600" />
                            </div>
                            <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                                8 processing • 4 waiting
                            </p>
                        </div>

                        {/* Action Link */}
                        <div className="mt-6 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                            <a
                                href="#"
                                className="flex items-center justify-between text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <span>View processing logs</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
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
                                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                    <UserPlus className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        New student registered
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Ava Thompson - University of Bristol
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-neutral-400">
                                        5 min ago
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                                    <Sparkles className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        Biology reviewer generated
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Emma Wilson • 24 practice questions
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-neutral-400">
                                        7 min ago
                                    </p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                                    <AlertCircle className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        Upload requires attention
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Noah Garcia • Password-protected PDF
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-neutral-400">
                                        18 min ago
                                    </p>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                    <ShieldCheck className="size-3.5" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        User access updated
                                    </p>
                                    <p className="text-[11px] text-neutral-500">
                                        Alex Morgan - Restored student account
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-neutral-400">
                                        32 min ago
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Link */}
                        <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                            <a
                                href="#"
                                className="flex items-center justify-between text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <span>View audit log</span>
                                <ArrowRight className="size-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Community Banner */}
            <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <Users className="size-5.5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-900 sm:text-base dark:text-neutral-100">
                                Keep your learning community in good hands
                            </h4>
                            <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                                Manage student accounts, review access and
                                invite new administrators.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-xs hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                        >
                            <Users className="size-3.5 text-neutral-500" />
                            <span>Manage users</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
                        >
                            <span>+ Invite administrator</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
