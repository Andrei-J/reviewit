import type { ReviewerItem, StudentDashboardStats } from '@/types/reviewer';

export const mockReviewers: ReviewerItem[] = [
    {
        id: '1',
        title: 'Midterm Reviewer',
        subject: 'Database Management',
        description:
            'Database concepts, SQL, and normalization materials for the midterm exam.',
        documentsCount: 3,
        status: 'Completed',
        updatedAt: 'Updated today',
        createdAt: 'Oct 8, 2026',
        documents: [
            {
                id: 'doc-1',
                name: 'Database_Concepts.pdf',
                type: 'PDF',
                size: '2.4 MB',
                uploadedAt: 'Oct 8, 2026',
                status: 'Completed',
            },
            {
                id: 'doc-2',
                name: 'SQL_Lecture_Notes.docx',
                type: 'DOCX',
                size: '840 KB',
                uploadedAt: 'Oct 9, 2026',
                status: 'Completed',
            },
            {
                id: 'doc-3',
                name: 'Normalization_Slides.pptx',
                type: 'PPTX',
                size: '3.1 MB',
                uploadedAt: 'Oct 10, 2026',
                status: 'Completed',
            },
        ],
    },
    {
        id: '2',
        title: 'Network Fundamentals',
        subject: 'Computer Networks',
        description:
            'OSI model, TCP/IP protocol suite, and routing algorithms overview.',
        documentsCount: 2,
        status: 'Processing',
        updatedAt: 'Updated today',
        createdAt: 'Oct 10, 2026',
        documents: [
            {
                id: 'doc-4',
                name: 'Network_Layer_Notes.pdf',
                type: 'PDF',
                size: '1.8 MB',
                uploadedAt: 'Oct 10, 2026',
                status: 'Processing',
            },
            {
                id: 'doc-5',
                name: 'IP_Addressing_Guide.docx',
                type: 'DOCX',
                size: '920 KB',
                uploadedAt: 'Oct 10, 2026',
                status: 'Completed',
            },
        ],
    },
    {
        id: '3',
        title: 'Sorting & Searching',
        subject: 'Data Structures',
        description:
            'Analysis of quicksort, mergesort, binary search trees and heap structures.',
        documentsCount: 2,
        status: 'Completed',
        updatedAt: 'Updated yesterday',
        createdAt: 'Oct 7, 2026',
        documents: [
            {
                id: 'doc-6',
                name: 'Sorting_Algorithms.pdf',
                type: 'PDF',
                size: '3.2 MB',
                uploadedAt: 'Oct 7, 2026',
                status: 'Completed',
            },
            {
                id: 'doc-7',
                name: 'Search_Trees_Slides.pptx',
                type: 'PPTX',
                size: '4.1 MB',
                uploadedAt: 'Oct 8, 2026',
                status: 'Completed',
            },
        ],
    },
    {
        id: '4',
        title: 'Process Management',
        subject: 'Operating Systems',
        description:
            'CPU scheduling, deadlock handling, threads, and concurrency mechanisms.',
        documentsCount: 2,
        status: 'Completed',
        updatedAt: 'Updated Oct 8, 2026',
        createdAt: 'Oct 5, 2026',
        documents: [
            {
                id: 'doc-8',
                name: 'OS_Processes_Threads.pdf',
                type: 'PDF',
                size: '2.1 MB',
                uploadedAt: 'Oct 5, 2026',
                status: 'Completed',
            },
            {
                id: 'doc-9',
                name: 'Scheduling_Algorithms.docx',
                type: 'DOCX',
                size: '750 KB',
                uploadedAt: 'Oct 6, 2026',
                status: 'Completed',
            },
        ],
    },
    {
        id: '5',
        title: 'Requirements Review',
        subject: 'Software Engineering',
        description:
            'SRS documentation, agile user stories, and acceptance criteria templates.',
        documentsCount: 1,
        status: 'Draft',
        updatedAt: 'Updated Oct 7, 2026',
        createdAt: 'Oct 7, 2026',
        documents: [
            {
                id: 'doc-10',
                name: 'Software_SRS_Draft.docx',
                type: 'DOCX',
                size: '1.1 MB',
                uploadedAt: 'Oct 7, 2026',
                status: 'Completed',
            },
        ],
    },
    {
        id: '6',
        title: 'Probability Basics',
        subject: 'Statistics',
        description:
            'Conditional probability, Bayes theorem, and random distribution variables.',
        documentsCount: 2,
        status: 'Failed',
        updatedAt: 'Updated Oct 5, 2026',
        createdAt: 'Oct 4, 2026',
        documents: [
            {
                id: 'doc-11',
                name: 'Probability_Set1.pdf',
                type: 'PDF',
                size: '5.4 MB',
                uploadedAt: 'Oct 4, 2026',
                status: 'Failed',
            },
            {
                id: 'doc-12',
                name: 'Stats_Formula_Sheet.pdf',
                type: 'PDF',
                size: '1.2 MB',
                uploadedAt: 'Oct 5, 2026',
                status: 'Completed',
            },
        ],
    },
];

export const defaultStudentStats: StudentDashboardStats = {
    totalReviewers: 6,
    totalDocuments: 12,
    availableReports: 1,
};

export interface StudentSubject {
    id: string;
    name: string;
    reviewerCount: number;
    createdAt: string;
}

export const mockStudentSubjects: StudentSubject[] = [
    {
        id: 'subj-1',
        name: 'Database Management',
        reviewerCount: 1,
        createdAt: 'Oct 6, 2026',
    },
    {
        id: 'subj-2',
        name: 'Computer Networks',
        reviewerCount: 1,
        createdAt: 'Oct 8, 2026',
    },
    {
        id: 'subj-3',
        name: 'Data Structures',
        reviewerCount: 1,
        createdAt: 'Oct 7, 2026',
    },
    {
        id: 'subj-4',
        name: 'Operating Systems',
        reviewerCount: 1,
        createdAt: 'Oct 5, 2026',
    },
    {
        id: 'subj-5',
        name: 'Software Engineering',
        reviewerCount: 1,
        createdAt: 'Oct 7, 2026',
    },
    {
        id: 'subj-6',
        name: 'Statistics',
        reviewerCount: 1,
        createdAt: 'Oct 4, 2026',
    },
];

export const subjectOptions = mockStudentSubjects.map((s) => s.name);

