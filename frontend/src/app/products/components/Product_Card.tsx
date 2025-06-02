'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiShuffle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { IProduct } from '@/lib/redux/interfaces/product.interface';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCompare } from '@/lib/redux/slices/productSlice';
import { RootState } from '@/lib/redux/store';
import { toast } from 'react-toastify';

export default function Product_Card({
    product,
    isCompare,
}: {
    product: IProduct;
    isCompare: boolean;
}) {
    const dispatch = useDispatch();
    const compareProducts = useSelector((state: RootState) => state.product.productCompare);
    const [isHovered, setIsHovered] = useState(false);
    const { _id, name, variant } = product;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const cleanImageUrl = (url: string) => {
        return url.split('&width=')[0];
    };

    const handleAddProductCompare = (product: IProduct) => {
        if (compareProducts.length >= 3) {
            toast.info('Maximum 3 products can be compared');
            return;
        }
        dispatch(addProductCompare(product));
    };

    return (
        <div
            className={`group relative flex flex-col transition-all duration-300 ${
                !isCompare && 'hover:scale-105'
            }`}
        >
            <div
                className={`relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 ${
                    isCompare && 'border border-white/30'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Carousel
                    opts={{
                        loop: true,
                        align: 'start',
                    }}
                    className='w-full h-full'
                >
                    <CarouselContent>
                        {variant.images.map((image, index) => (
                            <CarouselItem key={index} className='relative aspect-square p-7'>
                                <Link href={`/products/${_id}`}>
                                    <Image
                                        src={cleanImageUrl(image)}
                                        alt={`${name} - Image ${index + 1}`}
                                        width={600}
                                        height={600}
                                        className='object-contain w-full h-full rounded-lg lg:p-10 2xl:p-15'
                                        sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
                                        priority={index === 0}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {isHovered && variant.images.length > 1 && (
                        <>
                            <CarouselPrevious
                                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                            left-2 text-zinc-950 hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-950 
                            dark:text-zinc-950 dark:hover:text-zinc-100 dark:bg-zinc-100 dark:hover:bg-zinc-950
                            border-0 h-8 w-8 cursor-pointer'
                            />
                            <CarouselNext
                                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                            right-2 text-zinc-950 hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-950 
                            dark:text-zinc-950 dark:hover:text-zinc-100 dark:bg-zinc-100 dark:hover:bg-zinc-950
                            border-0 h-8 w-8 cursor-pointer'
                            />
                        </>
                    )}
                </Carousel>
            </div>

            <div className='mt-4 flex flex-col items-start gap-1'>
                <Link
                    href={`/products/${_id}`}
                    className='lg:text-sm 2xl:text-[16px] font-medium text-zinc-700 dark:text-zinc-200 
                    group-hover:text-zinc-950 dark:group-hover:text-zinc-100'
                >
                    {name}
                </Link>
                <p
                    className='lg:text-sm 2xl:text-[16px] font-medium text-zinc-700 dark:text-zinc-200 
                    hover:text-zinc-950 dark:hover:text-zinc-100'
                >
                    {formatPrice(variant.sellPrice)}
                </p>
            </div>

            <div
                className='absolute bottom-24 2xl:bottom-[85px] left-0 right-0 flex gap-2 translate-y-full px-3
                opacity-0 transition-all duration-200 group-hover:translate-y-2 group-hover:opacity-100'
            >
                <Button
                    className='flex-1 bg-zinc-300/50 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100 
                dark:bg-zinc-100/70 dark:hover:bg-amber-400/70 dark:hover:text-zinc-100 cursor-pointer'
                >
                    Quick Buy
                </Button>
                {!isCompare && (
                    <Button
                        onClick={() => handleAddProductCompare(product)}
                        className='flex-1 bg-zinc-300/50 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100 
                dark:bg-zinc-100/70 dark:hover:bg-amber-400/70 dark:hover:text-zinc-100 cursor-pointer'
                    >
                        <FiShuffle className='h-4 w-4' />
                        Compare
                    </Button>
                )}
            </div>
        </div>
    );
}
