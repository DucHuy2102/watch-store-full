import Link from 'next/link';
import { LogoApp, Navigation_Menu, Search } from '../customs';
import { Button } from '../ui/button';
import { AiFillLike } from 'react-icons/ai';
import ToggleTheme from './ToggleTheme';

export default function Navbar() {
    return (
        <div
            className='px-10 py-2 md:px-20 w-full flex justify-between items-center
        dark:border-b border-zinc-200 dark:border-zinc-800 shadow-sm'
        >
            <LogoApp />
            <Search />
            <Navigation_Menu />
            <div className='flex items-center gap-3'>
                <ToggleTheme />
                <Link href={'/auth/login'}>
                    <Button className='cursor-pointer'>Sign In</Button>
                </Link>
                <Button variant={'ghost'} className='border cursor-pointer'>
                    <AiFillLike className='text-zinc-500 dark:text-zinc-300' />
                </Button>
            </div>
        </div>
    );
}
