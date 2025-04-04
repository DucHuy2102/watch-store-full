'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosSend } from 'react-icons/io';
import { FiUser, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from '@/utils/Toast';
import { signIn, UserType } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getUser } from '@/lib/redux/slices/authSlice';
import { LogoApp } from '@/components/layouts';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Omit<UserType, 'email' | 'confirmPassword'>>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await signIn(formData);
            dispatch(getUser(res.user));
            toast.success('Login successfully!');
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Failed to Login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className='min-h-screen w-full flex items-center justify-center relative 
        bg-gradient-to-br from-gray-900 to-black p-4'
        >
            <div className='absolute inset-0 overflow-hidden'>
                <Image
                    src='/auth/login_img.jpg'
                    alt='Luxury Watch Background'
                    fill
                    className='object-cover opacity-20'
                    priority
                />
                <div className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>
            </div>

            <div className='absolute top-8 left-1/2 -translate-x-1/2'>
                <LogoApp variant='primary' />
            </div>

            <div
                className='relative w-full max-w-4xl flex rounded-2xl overflow-hidden bg-black/30 
            backdrop-blur-md border border-white/10 shadow-2xl'
            >
                <div className='hidden md:block w-1/2 relative'>
                    <Image
                        src='/auth/login_img.jpg'
                        alt='Luxury Watch'
                        fill
                        className='object-cover'
                        priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/10 to-transparent'></div>
                </div>

                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8'>
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-white'>
                            Welcome <span className='text-yellow-500'>Back</span>
                        </h1>
                        <p className='text-gray-400 text-sm'>Sign in to your account to continue</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='text'
                                    id='username'
                                    name='username'
                                    placeholder='Username'
                                    autoFocus
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                />
                            </div>

                            <div className='relative'>
                                <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                />
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <Link
                                href='/auth/forgot-password'
                                className='text-sm text-gray-400 hover:text-yellow-500 transition-colors duration-300'
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <Button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 
                            rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group'
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                            {!loading && (
                                <IoIosSend className='group-hover:translate-x-1 transition-transform duration-300' />
                            )}
                        </Button>

                        <div className='relative flex items-center gap-4 py-4'>
                            <div className='flex-grow h-px bg-gray-600'></div>
                            <span className='text-gray-400 bg-transparent px-0.5 text-sm whitespace-nowrap'>
                                Or continue with
                            </span>
                            <div className='flex-grow h-px bg-gray-600'></div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <Button
                                disabled={loading}
                                type='button'
                                variant='outline'
                                className='bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white 
                                transition-all duration-300 flex items-center justify-center gap-2'
                            >
                                <FcGoogle className='w-5 h-5' />
                                Google
                            </Button>
                            <Button
                                disabled={loading}
                                type='button'
                                variant='outline'
                                className='bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white 
                                transition-all duration-300 flex items-center justify-center gap-2'
                            >
                                <FaGithub className='w-5 h-5' />
                                GitHub
                            </Button>
                        </div>
                    </form>

                    <div className='text-center space-y-2'>
                        <p className='text-gray-400'>Don't have an account?</p>
                        <Link
                            href='/auth/register'
                            className='text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-300'
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
