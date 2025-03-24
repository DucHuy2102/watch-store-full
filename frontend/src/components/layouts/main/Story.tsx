'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Story() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className='container mx-auto mt-10 h-screen flex items-center justify-center'>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='relative py-20 px-10'
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className='text-center text-8xl font-semibold tracking-tighter bg-clip-text text-transparent 
                    bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 mb-8'
                >
                    Every watch has a{' '}
                    <span className='text-amber-500 dark:text-orange-400'>soul</span> and a{' '}
                    <span className='text-blue-500 dark:text-emerald-400'>story</span> to be told.
                </motion.h1>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className='max-w-2xl mx-auto text-center'
                >
                    <p className='text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed'>
                        Time isn't just measured — it's experienced. In every tick and every tock,
                        our watches carry stories of craftsmanship passed down through generations.
                        Each timepiece is more than an instrument; it's a companion in your journey,
                        marking moments that become memories, and a story to be told.
                    </p>
                    <div className='w-16 h-[1px] bg-zinc-300 mx-auto my-6' />
                    <p className='text-base text-zinc-500 dark:text-zinc-500 italic'>
                        Thank you for being part of our story.
                    </p>
                </motion.div>
            </motion.section>
        </div>
    );
}
