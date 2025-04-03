import { ReactNode } from 'react';
import Sidebar from './components/Sidebar';

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1'>{children}</div>
        </div>
    );
}
