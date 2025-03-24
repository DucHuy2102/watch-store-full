'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const collections = [
    {
        name: 'New',
        href: '/products/new',
        image: '/collection/new.webp',
        rotation: 'rotate-[8deg]',
    },
    {
        name: 'Best Sellers',
        href: '/products/best-sellers',
        image: '/collection/best_seller.webp',
        rotation: 'rotate-[4deg]',
    },
    {
        name: 'Military Inspired',
        href: '/products/military',
        image: '/collection/military.webp',
        rotation: 'rotate-[-4deg]',
    },
    {
        name: 'Automatic',
        href: '/products/automatic',
        image: '/collection/automatic.webp',
        rotation: 'rotate-[-8deg]',
    },
    {
        name: 'Vintage Inspired',
        href: '/products/vintage',
        image: '/collection/vintage.webp',
        rotation: 'rotate-[12deg]',
    },
    {
        name: 'Digital',
        href: '/products/digital',
        image: '/collection/digital.webp',
        rotation: 'rotate-[-12deg]',
    },
];

export default function Collection_HighLight() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='container mx-auto px-10 mt-26'
        >
            <div className='flex justify-between items-center gap-8'>
                <div className='w-1/2'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className='relative'
                    >
                        <h2 className='text-sm font-semibold tracking-wider text-zinc-700 dark:text-zinc-300'>
                            Collection Highlights
                        </h2>
                        <div className='w-1/3 h-[0.5px] bg-zinc-400 dark:text-zinc-700 absolute top-5' />
                    </motion.div>
                    <div className='flex flex-col gap-0.5 mt-10'>
                        {collections.map((collection, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 * index, duration: 0.5 }}
                                key={collection.name}
                            >
                                <Link
                                    href={collection.href}
                                    className='block group w-fit'
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div
                                        className={`flex items-center text-[2.8rem] tracking-wide font-semibold 
                                        transition-all duration-300
                                        ${
                                            hoveredIndex === null
                                                ? 'text-zinc-800 dark:text-zinc-200'
                                                : hoveredIndex === index
                                                ? 'text-zinc-900 dark:text-zinc-100 translate-x-7'
                                                : 'text-zinc-400 dark:text-zinc-600 blur-[0.3px]'
                                        }`}
                                    >
                                        {collection.name}
                                        <span
                                            className={`inline-block ml-4 transform transition-all duration-300 ${
                                                hoveredIndex === index
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 -translate-x-4'
                                            }`}
                                        >
                                            <span className='font-light'>
                                                <FiArrowRight />
                                            </span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='w-1/2 relative'
                >
                    <div className='aspect-square relative'>
                        {collections.map((collection, index) => (
                            <motion.div
                                key={collection.name}
                                animate={{
                                    scale: hoveredIndex === index ? 1.02 : 1,
                                    opacity:
                                        hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                                    rotate: collection.rotation.includes('rotate')
                                        ? parseInt(
                                              collection.rotation
                                                  .replace('rotate-[', '')
                                                  .replace('deg]', '')
                                          )
                                        : 0,
                                }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex:
                                        hoveredIndex === null
                                            ? collections.length - index
                                            : hoveredIndex === index
                                            ? collections.length
                                            : collections.length - index - 1,
                                }}
                            >
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className='object-cover rounded-sm shadow-2xl'
                                    priority
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
