'use client';

import { Button } from '@/components/ui/button';
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
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';

type RelatedProductCardProps = {
    id: string;
    name: string;
    price: number;
    images: string[];
};

const RelatedProductCard = memo(({ id, name, price, images }: RelatedProductCardProps) => {
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

    return (
        <div className='group relative flex flex-col'>
            <div className='relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
                <Link href={`/products/${id}`}>
                    <Image
                        src={cleanImageUrl(images[0])}
                        alt={name}
                        width={300}
                        height={300}
                        className='object-contain w-full h-full rounded-lg p-4'
                        sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
                        priority
                    />
                </Link>
            </div>

            <div className='mt-3 flex flex-col items-center text-center'>
                <Link
                    href={`/products/${id}`}
                    className='text-sm font-medium text-zinc-700 dark:text-zinc-200 
                    group-hover:text-zinc-950 dark:group-hover:text-zinc-100 truncate w-full'
                >
                    {name}
                </Link>
                <Badge className='text-sm font-bold tracking-wide text-zinc-100/90 dark:text-zinc-900 px-3'>
                    {formatPrice(price)}
                </Badge>
            </div>

            <div
                className='absolute bottom-20 left-0 right-0 flex justify-center opacity-0 transition-all duration-200 
                group-hover:translate-y-2 group-hover:opacity-100'
            >
                <Button
                    className='bg-zinc-300/50 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100 
                    dark:bg-zinc-100/70 dark:hover:bg-amber-400/70 dark:hover:text-zinc-100 cursor-pointer
                    text-xs px-3 py-1 h-8'
                >
                    Quick View
                </Button>
            </div>
        </div>
    );
});

export default function Product_Related({ products }: { products: IProduct[] }) {
    return (
        <div className='mt-16 mb-10'>
            <div className='flex flex-col items-center mb-8'>
                <h2 className='text-2xl font-serif italic tracking-wide text-zinc-800 dark:text-zinc-200 relative inline-block'>
                    You May Also Like
                    <span className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[40vw] h-0.5 bg-amber-400'></span>
                </h2>
                <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-md tracking-wider text-center'>
                    Discover more timepieces that complement your style
                </p>
            </div>
            <Carousel className='w-full px-10'>
                <CarouselContent className='-ml-1'>
                    {products?.map((product, index) => (
                        <CarouselItem key={index} className='pl-1 md:basis-1/3 lg:basis-1/4'>
                            <div className='p-1'>
                                <RelatedProductCard
                                    id={product._id}
                                    name={product.name}
                                    price={product.variant.sellPrice}
                                    images={product.variant.images.slice(0, 1)}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='left-2' />
                <CarouselNext className='right-2' />
            </Carousel>
        </div>
    );
}
