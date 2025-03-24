import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ShopNow() {
    return (
        <div className='container mx-auto pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <Link href='/products/men' className='group relative overflow-hidden rounded-2xl'>
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
                                className='inline-flex items-center text-white font-medium border border-white/30 px-6 py-2 rounded-full
                                group-hover:bg-white group-hover:text-black transition-all duration-300 gap-2'
                            >
                                Shop Now
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href='/products/women' className='group relative overflow-hidden rounded-2xl'>
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
                                className='inline-flex items-center text-white font-medium border border-white/30 px-6 py-2 rounded-full
                                group-hover:bg-white group-hover:text-black transition-all duration-300 gap-2'
                            >
                                Shop Now
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
