'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const logoTextVariants = cva('tracking-wider text-3xl font-bold flex items-center', {
    variants: {
        variant: {
            default: 'text-slate-600 hover:text-slate-800 dark:text-slate-100',
            light: 'text-white hover:text-gray-200',
            dark: 'text-gray-800 hover:text-black dark:text-white',
            primary: 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface LogoAppProps extends VariantProps<typeof logoTextVariants> {
    className?: string;
}

export default function LogoApp({ variant, className }: LogoAppProps) {
    return (
        <Link href='/'>
            <motion.div
                className='relative inline-block cursor-pointer'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover='hover'
            >
                <motion.h1 className={cn(logoTextVariants({ variant, className }))}>
                    <span>
                        <motion.span
                            className='text-emerald-500 dark:text-emerald-400'
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.4,
                                    duration: 0.5,
                                    ease: 'backOut',
                                },
                            }}
                            variants={{
                                hover: {
                                    scale: 1.2,
                                    color: ['#10b981', '#059669', '#10b981'],
                                    rotate: [0, -5, 5, 0],
                                    transition: {
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                        repeat: 0,
                                    },
                                },
                            }}
                        >
                            W
                        </motion.span>
                        atch
                        <motion.span
                            className='text-emerald-500 dark:text-emerald-400'
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.4,
                                    duration: 0.5,
                                    ease: 'backOut',
                                },
                            }}
                            variants={{
                                hover: {
                                    scale: 1.2,
                                    color: ['#10b981', '#059669', '#10b981'],
                                    rotate: [0, -5, 5, 0],
                                    transition: {
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                        repeat: 0,
                                    },
                                },
                            }}
                        >
                            S
                        </motion.span>
                        tore
                    </span>
                </motion.h1>
                <motion.div
                    className='absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500 dark:bg-emerald-400'
                    variants={{
                        hover: {
                            width: '100%',
                            transition: {
                                duration: 0.3,
                                ease: 'easeInOut',
                            },
                        },
                    }}
                />
            </motion.div>
        </Link>
    );
}
