'use client';

import Link from 'next/link';
import { LogoApp, Navigation_Menu, Search } from './index';
import { Button } from '../ui/button';
import ToggleTheme from './custom/ToggleTheme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IUser } from '@/lib/redux/interfaces/auth.interface';
import { clearUser } from '@/lib/redux/slices/authSlice';

export default function Navbar() {
    const { user } = useSelector((state: RootState) => state.auth);

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
                {user ? (
                    <UserDropdown user={user} />
                ) : (
                    <Link href={'/auth/login'}>
                        <Button className='cursor-pointer'>Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

const UserDropdown = ({ user }: { user: IUser }) => {
    const dispatch = useDispatch();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href='/profile'>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/profile/billing'>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/profile/settings'>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => dispatch(clearUser())}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
