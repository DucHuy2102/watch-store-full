'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
    FiUser,
    FiShoppingBag,
    FiHeart,
    FiCreditCard,
    FiMapPin,
    FiSettings,
    FiLogOut,
} from 'react-icons/fi';
import { signOut } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import toast from '@/utils/Toast';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const menuItems = [
    {
        title: 'My Profile',
        href: '/profile',
        icon: FiUser,
    },
    {
        title: 'My Orders',
        href: '/profile/orders',
        icon: FiShoppingBag,
    },
    {
        title: 'Wishlist',
        href: '/profile/wishlist',
        icon: FiHeart,
    },
    {
        title: 'Payment Methods',
        href: '/profile/payment',
        icon: FiCreditCard,
    },
    {
        title: 'Addresses',
        href: '/profile/addresses',
        icon: FiMapPin,
    },
    {
        title: 'Settings',
        href: '/profile/settings',
        icon: FiSettings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            dispatch(clearUser());
            toast.success('Signed out successfully');
            router.push('/auth/login');
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className='w-64 min-h-screen bg-background border-r p-6 flex flex-col'>
            <div className='flex flex-col items-center mb-8'>
                <Avatar className='w-20 h-20 mb-4'>
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className='text-lg font-semibold'>{user?.username}</h2>
                <p className='text-sm text-muted-foreground'>{user?.email}</p>
            </div>

            <nav className='flex-1'>
                <ul className='space-y-2'>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                                        pathname === item.href
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    )}
                                >
                                    <Icon className='w-5 h-5' />
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className='flex items-center gap-3 px-4 py-2 rounded-lg text-white dark:text-zinc-900
                        hover:bg-red-600/90 dark:hover:text-white transition-colors cursor-pointer'
                    >
                        <FiLogOut className='w-5 h-5' />
                        <span>Sign Out</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Sign Out</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to sign out? You will need to sign in again to
                            access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='flex gap-2'>
                        <Button variant='destructive' onClick={handleSignOut}>
                            Sign Out
                        </Button>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
