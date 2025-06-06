'use client';

import { ReactNode, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';

export default function ProfileLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, router]);

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1'>{children}</div>
        </div>
    );
}
