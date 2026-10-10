import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <AppLogoIcon className="size-5 fill-current text-white" />
            </div>
            <div className="ml-1.5 grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-bold text-neutral-900 dark:text-neutral-100">
                    ReviewIt
                </span>
                <span className="truncate text-[10px] leading-tight text-neutral-500 dark:text-neutral-400">
                    AI-Powered Learning Platform
                </span>
            </div>
        </>
    );
}
