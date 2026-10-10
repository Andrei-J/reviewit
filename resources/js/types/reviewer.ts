export type ReviewerStatus = 'Completed' | 'Processing' | 'Draft' | 'Failed';

export interface ReviewerMaterial {
    id: string;
    name: string;
    type: 'PDF' | 'DOCX' | 'PPTX' | string;
    size: string;
    uploadedAt?: string;
    status?: 'Completed' | 'Processing' | 'Failed';
}

export interface ReviewerItem {
    id: string | number;
    title: string;
    subject: string;
    description?: string;
    documentsCount: number;
    documents?: ReviewerMaterial[];
    status: ReviewerStatus;
    updatedAt: string;
    createdAt?: string;
}

export interface StudentDashboardStats {
    totalReviewers: number;
    totalDocuments: number;
    availableReports: number;
}
