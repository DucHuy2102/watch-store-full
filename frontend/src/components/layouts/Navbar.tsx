import Link from 'next/link';
import { LogoApp, Navigation_Menu, Search } from '../customs';
import { Button } from '../ui/button';
import { ToggleTheme } from './ToggleTheme';
import { AiFillLike } from 'react-icons/ai';

export default function Navbar() {
    return (
        <div className='px-20 py-2 flex justify-between items-center dark:border-b border-zinc-200 dark:border-zinc- shadow-sm'>
            <LogoApp />
            <Search />
            <Navigation_Menu />
            <div className='flex items-center gap-3'>
                <ToggleTheme />
                <Link href={'/login'}>
                    <Button>Login</Button>
                </Link>
                <Button variant={'ghost'} className='border'>
                    <AiFillLike className='text-zinc-500 dark:text-zinc-300' />
                </Button>
            </div>
        </div>
    );
}
