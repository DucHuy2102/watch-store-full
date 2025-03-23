'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosSend } from 'react-icons/io';
import { FiMail, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { SiGmail } from 'react-icons/si';
import { LogoApp } from '@/components/customs';
import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from '@/utils/Toast';

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSent(true);
        try {
            console.log('Form submitted:', email);
            toast.success('Form has been sent successfully!');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Something went wrong! Please try again.');
        }
    };

    const openGmail = () => {
        window.open('https://mail.google.com', '_blank');
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-black p-4'>
            <div className='absolute inset-0 overflow-hidden'>
                <Image
                    src='/forgot_password.webp'
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
                        src='/forgot_password.webp'
                        alt='Luxury Watch'
                        fill
                        className='object-cover'
                        priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/10 to-transparent'></div>
                </div>

                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8'>
                    <AnimatePresence mode='wait'>
                        {!isSent ? (
                            <motion.div
                                key='request-form'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className='space-y-8'
                            >
                                <div className='text-center space-y-2'>
                                    <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-white'>
                                        Reset <span className='text-yellow-500'>Password</span>
                                    </h1>
                                    <p className='text-gray-400 text-sm max-w-sm mx-auto'>
                                        Enter your email address and we'll send you instructions to
                                        reset your password
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div className='space-y-4'>
                                        <div className='relative'>
                                            <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <Input
                                                type='email'
                                                id='email'
                                                placeholder='Enter your email address'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoFocus
                                                required
                                                className='w-full pl-10 bg-white/10 border-white/10 text-white 
                                                placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 
                                                transition-all duration-300'
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type='submit'
                                        className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold 
                                        py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group'
                                    >
                                        Send Reset Instructions
                                        <IoIosSend className='group-hover:translate-x-1 transition-transform duration-300' />
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key='success-message'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className='text-center space-y-6'
                            >
                                <div className='flex flex-col items-center space-y-4'>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    >
                                        <FiCheckCircle className='w-16 h-16 text-yellow-500' />
                                    </motion.div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-white'>
                                        Check your email
                                    </h2>
                                    <p className='text-gray-400 text-sm max-w-sm'>
                                        We've sent password reset instructions to:
                                    </p>
                                    <p className='text-yellow-500 font-medium'>{email}</p>
                                </div>

                                <div className='space-y-4 pt-4'>
                                    <div className='flex flex-col items-center gap-3'>
                                        <Button
                                            onClick={openGmail}
                                            className='bg-red-500 hover:bg-red-600 text-white font-semibold 
                                            py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2'
                                        >
                                            <SiGmail className='w-5 h-5' />
                                            Open Gmail
                                            <FiExternalLink className='w-4 h-4' />
                                        </Button>
                                        <span className='text-gray-400 text-sm'>or</span>
                                        <Button
                                            onClick={() => setIsSent(false)}
                                            variant='outline'
                                            className='bg-white/10 border-white/10 text-white hover:bg-white/20 
                                            hover:text-white transition-all duration-300'
                                        >
                                            Try another email address
                                        </Button>
                                    </div>
                                    <p className='text-gray-400 text-sm pt-2'>
                                        Didn't receive the email? Check your spam folder
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className='text-center space-y-4'>
                        <div className='space-y-2'>
                            <p className='text-gray-400'>Remember your password?</p>
                            <Link
                                href='/auth/login'
                                className='text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-300'
                            >
                                Back to Sign in
                            </Link>
                        </div>

                        {!isSent && (
                            <div className='space-y-2'>
                                <p className='text-gray-400'>Don't have an account?</p>
                                <Link
                                    href='/auth/register'
                                    className='text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-300'
                                >
                                    Create an account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
