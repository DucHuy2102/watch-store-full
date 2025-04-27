'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShopNow() {
    const router = useRouter();
    const handleClick = (gender: string) => {
        router.push(`/products?gender=${gender}`);
    };

    return (
        <section className='container mx-auto mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='group relative overflow-hidden rounded-2xl'>
                    <div className='aspect-[4/5] relative'>
                        <Image
                            src='/shop_now/men.webp'
                            alt='Men'
                            fill
                            className='object-cover transform group-hover:scale-110 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
                        <div className='absolute bottom-8 left-8 right-8'>
                            <p className='text-white/80 mb-2 text-sm tracking-wider uppercase'>
                                Collection
                            </p>
                            <h3 className='text-white text-2xl font-bold mb-4'>
                                Men's Best Sellers
                            </h3>
                            <div
                                onClick={() => handleClick('Men')}
                                className='inline-flex items-center text-white font-medium border border-white/30 px-6 py-2 rounded-full
                                group-hover:bg-white group-hover:text-black transition-all duration-300 gap-2 cursor-pointer'
                            >
                                Shop Now
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='group relative overflow-hidden rounded-2xl'>
                    <div className='aspect-[4/5] relative'>
                        <Image
                            src='/shop_now/girl.webp'
                            alt='Women'
                            fill
                            className='object-cover transform group-hover:scale-110 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
                        <div className='absolute bottom-8 left-8 right-8'>
                            <p className='text-white/80 mb-2 text-sm tracking-wider uppercase'>
                                Collection
                            </p>
                            <h3 className='text-white text-2xl font-bold mb-4'>
                                Women's Best Sellers
                            </h3>
                            <div
                                onClick={() => handleClick('Women')}
                                className='inline-flex items-center text-white font-medium border border-white/30 px-6 py-2 rounded-full
                                group-hover:bg-white group-hover:text-black transition-all duration-300 gap-2 cursor-pointer'
                            >
                                Shop Now
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
