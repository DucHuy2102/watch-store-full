'use client';

import { ReactNode } from 'react';
import { Footer, Navbar } from '@/components/layouts';
import { usePathname } from 'next/navigation';

const hideLayout = ['/auth/login', '/auth/register'];

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    console.log(pathname);

    return (
        <>
            {!hideLayout.includes(pathname) && <Navbar />}
            {children}
            {!hideLayout.includes(pathname) && <Footer />}
        </>
    );
}
