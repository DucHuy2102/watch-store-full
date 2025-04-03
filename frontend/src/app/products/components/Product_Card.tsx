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

interface IProductCardProps {
    id: string;
    name: string;
    price: number;
    images: string[];
}

export default function Product_Card({ id, name, price, images }: IProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className='group relative flex flex-col hover:scale-105 transition-all duration-300'>
            <div
                className='relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'
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
                        {images.map((image, index) => (
                            <CarouselItem key={index} className='relative aspect-square'>
                                <Link href={`/products/${id}`}>
                                    <Image
                                        src={image}
                                        alt={`${name} - Image ${index + 1}`}
                                        fill
                                        className='object-cover object-center'
                                        sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
                                        priority={index === 0}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {isHovered && images.length > 1 && (
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
                    href={`/products/${id}`}
                    className='text-sm font-medium text-zinc-700 dark:text-zinc-200 
                    hover:text-zinc-950 dark:hover:text-zinc-100'
                >
                    {name}
                </Link>
                <p
                    className='text-sm font-medium text-zinc-700 dark:text-zinc-200 
                    hover:text-zinc-950 dark:hover:text-zinc-100'
                >
                    {formatPrice(price)}
                </p>
            </div>

            <div
                className='absolute bottom-20 left-0 right-0 flex gap-2 translate-y-full px-3
                opacity-0 transition-all duration-200 group-hover:translate-y-2 group-hover:opacity-100'
            >
                <Button
                    className='flex-1 bg-zinc-100 text-zinc-950 
                hover:bg-zinc-950 hover:text-zinc-100 cursor-pointer'
                >
                    Quick Buy
                </Button>
                <Button
                    className='flex-1 bg-zinc-100 text-zinc-950 
                hover:bg-zinc-950 hover:text-zinc-100 cursor-pointer'
                >
                    <FiShuffle className='h-4 w-4' />
                    Compare
                </Button>
            </div>
        </div>
    );
}
