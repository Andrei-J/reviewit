import { Head, usePage } from '@inertiajs/react';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { StudentDashboard } from '@/components/student/student-dashboard';
import { dashboard } from '@/routes';
import type { SharedData } from '@/types';
import type { ReviewerItem } from '@/types/reviewer';

interface DashboardPageProps {
    reviewers?: ReviewerItem[];
}

export default function Dashboard({ reviewers }: DashboardPageProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.roles?.includes('admin');

    if (isAdmin) {
        return (
            <>
                <Head title="Admin Dashboard" />
                <AdminDashboard />
            </>
        );
    }

    return (
        <>
            <Head title="Student Dashboard" />
            <StudentDashboard initialReviewers={reviewers} />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
