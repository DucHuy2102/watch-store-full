'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosSend } from 'react-icons/io';
import { FiLock } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from '@/utils/Toast';
import { LogoApp } from '@/components/layouts';
import { Loader2 } from 'lucide-react';
import { resetPassword } from '@/api/auth';
import PasswordStrengthMeter from '@/utils/PasswordStrengthMeter';

export default function ResetPassword({ params }: { params: { code: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        try {
            await resetPassword({
                code: params.code,
                password: formData.password,
            });
            toast.success('Password reset successfully!');
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            console.error(error);
            if (error instanceof Error && 'status' in error && error.status === 400) {
                const apiError = error as any;
                toast.error(apiError.response?.data?.message);
            } else {
                toast.error('Crash server - Please try later !!!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-black p-4'>
            <div className='absolute inset-0 overflow-hidden'>
                <Image
                    src='/auth/verify-email.jpg'
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

            <div className='relative w-full max-w-4xl flex rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl'>
                <div className='hidden md:block w-1/2 relative'>
                    <Image
                        src='/auth/verify-email.jpg'
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
                            Reset <span className='text-yellow-500'>Password</span>
                        </h1>
                        <p className='text-gray-400 text-sm'>Enter your new password below</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='New Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                    placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                    transition-all duration-300'
                                    required
                                />
                            </div>

                            <div className='mt-2'>
                                <PasswordStrengthMeter password={formData.password} />
                            </div>

                            <div className='relative'>
                                <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    placeholder='Confirm New Password'
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
                            disabled={isLoading}
                            className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold 
                            py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group'
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                    <span>Resetting password...</span>
                                </>
                            ) : (
                                <>
                                    Reset Password
                                    <IoIosSend className='group-hover:translate-x-1 transition-transform duration-300' />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className='text-center space-y-2'>
                        <p className='text-gray-400'>Remember your password?</p>
                        <Link
                            href='/auth/login'
                            className='text-yellow-500 hover:text-yellow-400 hover:underline font-medium transition-colors duration-300'
                        >
                            Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
