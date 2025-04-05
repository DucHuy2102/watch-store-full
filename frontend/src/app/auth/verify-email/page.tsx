'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import { verifyEmail } from '@/api/auth';
import { useRouter } from 'next/navigation';
import toast from '@/utils/Toast';
import { LogoApp } from '@/components/layouts';

export default function VerifyEmail() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await verifyEmail(code);
            toast.success("Let's get you logged in!");
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            console.log(error);
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
        <div className='min-h-screen w-full flex items-center justify-center relative bg-black'>
            <div className='absolute inset-0'>
                <Image
                    src='/auth/verify-email.jpg'
                    alt='Luxury Watch Background'
                    fill
                    className='object-cover'
                    priority
                />
                <div className='absolute inset-0 bg-black/70 backdrop-blur-sm'></div>
            </div>

            <div className='absolute top-4 left-1/2 -translate-x-1/2'>
                <LogoApp variant='primary' />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='relative z-10 text-center space-y-8'
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className='space-y-2'
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-3xl font-bold text-white'
                    >
                        Enter Verification Code
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-white'
                    >
                        Please enter the 6-digit verification code sent to your email.
                    </motion.p>
                </motion.div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={code}
                        onChange={(value) => setCode(value)}
                    >
                        <InputOTPGroup className='mx-auto'>
                            <InputOTPSlot index={0} className='text-white text-2xl h-14 w-14' />
                            <InputOTPSlot index={1} className='text-white text-2xl h-14 w-14' />
                            <InputOTPSlot index={2} className='text-white text-2xl h-14 w-14' />
                            <InputOTPSlot index={3} className='text-white text-2xl h-14 w-14' />
                            <InputOTPSlot index={4} className='text-white text-2xl h-14 w-14' />
                            <InputOTPSlot index={5} className='text-white text-2xl h-14 w-14' />
                        </InputOTPGroup>
                    </InputOTP>

                    <Button
                        type='submit'
                        disabled={isLoading || code.length !== 6}
                        className='w-full max-w-xs bg-yellow-500 hover:bg-yellow-600 text-black font-semibold 
                        py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
