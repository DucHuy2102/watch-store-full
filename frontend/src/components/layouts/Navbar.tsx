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
import { toast } from 'react-toastify';
import { signOut } from '@/api/auth';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdLocalShipping, MdEmail } from 'react-icons/md';
import { IoShieldCheckmark } from 'react-icons/io5';
import { useCopyToClipboard } from '@uidotdev/usehooks';

export default function Navbar() {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className='flex flex-col items-center justify-between'>
            <TopNav />
            <div className='px-10 py-3 md:px-20 w-full flex justify-between items-center'>
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
        </div>
    );
}

const TopNav = () => {
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const handleCopyEmail = async () => {
        const email = 'duchuytv2102@gmail.com';
        try {
            await copyToClipboard(email);
            toast.success('Email copied to clipboard!');
        } catch (error) {
            toast.error('Please try again later !!!');
        }
    };

    return (
        <div
            className='px-10 py-1 md:px-20 w-full flex justify-between items-center font-mono text-sm md:text-base 
bg-zinc-100/50 dark:bg-zinc-800/50 backdrop-blur-md'
        >
            <div className='flex items-center gap-2'>
                <FaPhoneAlt />
                <span>0394 849 668</span>
            </div>
            <div className='flex items-center gap-2'>
                <MdLocalShipping className='text-xl' />
                <span>Free Shipping in VietNam</span>
            </div>
            <div className='flex items-center gap-2'>
                <IoShieldCheckmark className='text-lg' />
                <span>Lifetime warranty</span>
            </div>
            <div
                className='flex items-center gap-2 cursor-pointer'
                onClick={handleCopyEmail}
                title='Click to copy email'
            >
                <MdEmail className='text-xl' />
                <span>duchuytv2102@gmail.com</span>
            </div>
        </div>
    );
};

const UserDropdown = ({ user }: { user: IUser }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success('Logout successfully!');
            dispatch(clearUser());
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
        }
    };

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
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
