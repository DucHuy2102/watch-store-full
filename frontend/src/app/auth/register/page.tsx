'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosSend } from 'react-icons/io';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import { useState, FormEvent, ChangeEvent } from 'react';
import toast from '@/utils/Toast';
import { LogoApp } from '@/components/layouts';
import PasswordStrengthMeter, { getStrength } from '@/utils/PasswordStrengthMeter';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signUp, UserType } from '@/api/auth';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserType>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match!");
            setIsLoading(false);
            return;
        }

        if (getStrength(formData.password) < 3) {
            toast.error('Password too weak!');
            setIsLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...rest } = formData;
            await signUp(rest);
            toast.success("Let's verify your email!");
            setTimeout(() => {
                router.push('/auth/verify-email');
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-black p-4'>
            <div className='absolute inset-0 overflow-hidden'>
                <Image
                    src='/auth/register_img.webp'
                    alt='Luxury Watch Background'
                    fill
                    className='object-cover opacity-20'
                    priority
                />
                <div className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>
            </div>

            <div className='relative w-full max-w-4xl flex rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl'>
                <div className='hidden md:block w-1/2 relative'>
                    <Image
                        src='/auth/register_img.webp'
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
                            Create <span className='text-yellow-500'>Account</span>
                        </h1>
                        <p className='text-gray-400 text-sm'>
                            Fill in the form to create your new account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='text'
                                    id='username'
                                    name='username'
                                    placeholder='Username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoFocus
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                    required
                                />
                            </div>

                            <div className='relative'>
                                <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                    required
                                />
                            </div>

                            <div className='relative'>
                                <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                    required
                                />
                            </div>
                            {formData.password && (
                                <div className='mt-2'>
                                    <PasswordStrengthMeter password={formData.password} />
                                </div>
                            )}

                            <div className='relative'>
                                <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type='submit'
                            className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold 
                        py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group'
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <IoIosSend className='group-hover:translate-x-1 transition-transform duration-300' />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className='flex items-center justify-between'>
                        <div className='text-center space-y-2'>
                            <p className='text-gray-400'>Visit our</p>
                            <LogoApp variant='primary' />
                        </div>
                        <div className='h-full bg-zinc-500 w-0.5' />
                        <div className='text-center space-y-2'>
                            <p className='text-gray-400'>Back to</p>
                            <Link
                                href='/auth/login'
                                className='text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-300'
                            >
                                Sign in page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
