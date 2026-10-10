import type { Auth } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './reviewer';

export type BannedAccountInfo = {
    reason?: string | null;
    banned_at?: string | null;
    email?: string | null;
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    flash?: {
        banned_account?: BannedAccountInfo | null;
        [key: string]: unknown;
    };
    [key: string]: unknown;
};

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

export type CommunityStats = {
    total: number;
    active: number;
    banned: number;
    premium: number;
    free: number;
};
