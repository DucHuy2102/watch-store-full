'use client';

import { FaGithub, FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import LogoApp from './custom/LogoApp';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;
const FACEBOOK_LINK = process.env.NEXT_PUBLIC_FACEBOOK_LINK;

export default function Footer() {
    const [isHiddenURL, setIsHiddenURL] = useState(false);
    const pathName = usePathname();
    useEffect(() => {
        const isProductDetail = /^\/products\/[^/]+$/.test(pathName);
        setIsHiddenURL(!isProductDetail);
    }, [pathName]);

    return (
        <footer
            className={`px-10 py-8 md:px-20 bg-zinc-950 mt-auto ${
                isHiddenURL ? 'rounded-tl-[100px]' : 'rounded-tl-none'
            }`}
        >
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800'>
                    <div className='space-y-4'>
                        <LogoApp variant={'light'} />
                        <p className='text-zinc-400 text-sm mt-3 italic'>
                            Discover timeless elegance with our curated collection of luxury
                            timepieces.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-zinc-200 font-semibold'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/'
                                    className='text-zinc-400 hover:text-zinc-200 text-sm transition-colors'
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/service'
                                    className='text-zinc-400 hover:text-zinc-200 text-sm transition-colors'
                                >
                                    Services & Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/about-us'
                                    className='text-zinc-400 hover:text-zinc-200 text-sm transition-colors'
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='text-zinc-400 hover:text-zinc-200 text-sm transition-colors'
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-zinc-200 font-semibold'>Visit Our Store</h3>
                        <div className='space-y-2'>
                            <p className='text-zinc-400 text-sm'>
                                123 Luxury Avenue
                                <br />
                                New York, NY 10001
                            </p>
                            <div className='text-zinc-400 text-sm space-y-1'>
                                <p className='font-semibold text-zinc-300'>Hours of Operation:</p>
                                <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
                                <p>Sat - Sun: 10:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-zinc-200 font-semibold'>Get Special Discounts</h3>
                        <p className='text-zinc-400 text-sm'>
                            Subscribe to receive updates and exclusive offers from our store.
                        </p>
                        <div className='flex gap-1'>
                            <Input
                                type='email'
                                placeholder='Enter your email'
                                className='bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-500'
                            />
                            <Button className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200'>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between pt-6 gap-4'>
                    <div className='tracking-wider text-sm font-medium text-zinc-300'>
                        © 2025{' '}
                        <a
                            href={GITHUB_LINK}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-emerald-500 hover:underline'
                        >
                            Nguyen Duc Huy
                        </a>
                        . All Rights Reserved.
                    </div>
                    <div className='flex items-center gap-5'>
                        <a
                            href={GITHUB_LINK}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-zinc-500 hover:text-zinc-100 text-2xl transition-colors'
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={FACEBOOK_LINK}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-zinc-500 hover:text-zinc-100 text-xl transition-colors'
                        >
                            <FaFacebookF />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
