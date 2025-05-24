'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export default function Search() {
    const router = useRouter();
    const [searchTermInput, setSearchTermInput] = useState('');

    const handleSearch = async () => {
        if (!searchTermInput.trim()) return;

        const currentPath = window.location.pathname;
        const url = new URL(window.location.href);
        url.searchParams.set('search', searchTermInput.trim());
        url.searchParams.delete('page');
        if (currentPath !== '/products') {
            url.pathname = '/products';
        }
        router.push(url.toString());
        setSearchTermInput('');
    };

    return (
        <div className='relative w-sm lg:w-md'>
            <input
                placeholder='Search your watch here...'
                className='py-2 pl-4 pr-10 focus:outline-none tracking-wide font-sans border w-full rounded-lg'
                value={searchTermInput}
                onChange={(e) => setSearchTermInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <SearchIcon
                className='text-zinc-500 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-blue-500'
                onClick={handleSearch}
            />
        </div>
    );
}
