import Link from 'next/link';
import { FaGithub, FaFacebookF } from 'react-icons/fa';

const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;
const FACEBOOK_LINK = process.env.NEXT_PUBLIC_FACEBOOK_LINK;

export default function Footer() {
    return (
        <footer className='px-10 py-2 md:px-20 border-t border-zinc-200 dark:border-zinc-700 shadow-sm mt-auto flex items-center justify-between'>
            <Link
                href={'/'}
                className='tracking-wider font-medium text-zinc-700 dark:text-zinc-400'
            >
                © 2025 <span className='text-emerald-500 hover:underline'>WatchStore</span>. All
                rights reserved.
            </Link>
            <div className='flex items-center gap-5'>
                <span className='rounded-xl p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-transparent dark:hover:bg-transparent transition-colors duration-200'>
                    <a href={GITHUB_LINK} target='_blank' rel='noopener noreferrer'>
                        <FaGithub />
                    </a>
                </span>
                <span className='rounded-xl p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-transparent dark:hover:bg-transparent transition-colors duration-200'>
                    <a href={FACEBOOK_LINK} target='_blank' rel='noopener noreferrer'>
                        <FaFacebookF />
                    </a>
                </span>
            </div>
        </footer>
    );
}
