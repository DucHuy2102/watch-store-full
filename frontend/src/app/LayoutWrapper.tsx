'use client';

import { ReactNode } from 'react';
import { Footer, Navbar } from '@/components/layouts';
import { usePathname } from 'next/navigation';

const hideLayout = [
    '/auth/login',
    '/auth/register',
    '/auth/verify-email',
    '/auth/forgot-password',
    '/auth/reset-password/:code',
];

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const shouldHideLayout = hideLayout.some((route) => {
        const pattern = '^' + route.replace(/:[^/]+/g, '[^/]+') + '$';
        const regex = new RegExp(pattern);
        return regex.test(pathname);
    });

    return (
        <>
            {!shouldHideLayout && <Navbar />}
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}
