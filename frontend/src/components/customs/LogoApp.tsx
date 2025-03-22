'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LogoApp() {
    return (
        <Link href='/'>
            <motion.div
                className='relative inline-block cursor-pointer'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover='hover'
            >
                <motion.h1 className='tracking-wider text-2xl font-bold text-slate-600 hover:text-slate-800 dark:text-slate-100 flex items-center'>
                    <span>
                        Watch
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
