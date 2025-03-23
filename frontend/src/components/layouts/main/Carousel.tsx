import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const carouselData = [
    {
        image: '/carousel_1.webp',
        title: 'Classic Elegance',
        description:
            'Timeless design meets modern craftsmanship. Our signature timepiece features premium materials and Swiss movement.',
        price: '$299.99',
    },
    {
        image: '/carousel_2.webp',
        title: 'Military Precision',
        description:
            'Inspired by military heritage, built for everyday adventures. Featuring 24-hour time and water resistance.',
        price: '$199.99',
    },
    {
        image: '/carousel_3.webp',
        title: 'Sport Chronograph',
        description:
            'Performance meets style. Track every second with precision in this sophisticated chronograph watch.',
        price: '$349.99',
    },
    {
        image: '/carousel_4.webp',
        title: 'Modern Classic',
        description:
            'The perfect blend of traditional watchmaking and contemporary design. A statement piece for any occasion.',
        price: '$279.99',
    },
    {
        image: '/carousel_5.jpg',
        title: 'Vintage Collection',
        description:
            'A tribute to timeless style. Hand-finished details and premium leather strap make this piece truly special.',
        price: '$399.99',
    },
];

export default function Carousel_Section() {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className='w-full h-[calc(100vh-4rem)] mx-auto overflow-hidden relative'
        >
            <CarouselContent>
                {carouselData.map((item, index) => (
                    <CarouselItem key={index} className='w-full'>
                        <div className='relative w-full h-[calc(100vh-4rem)]'>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority={index === 0}
                                className='object-cover'
                                sizes='100vw'
                            />
                            <div
                                className='absolute top-0 right-0 w-1/3 h-full bg-black/70 text-white 
                            p-12 flex flex-col justify-center'
                            >
                                <h2 className='text-4xl font-bold mb-6'>{item.title}</h2>
                                <p className='text-lg mb-8 text-gray-300'>{item.description}</p>
                                <p className='text-3xl font-bold mb-8'>{item.price}</p>
                                <Link href='/products'>
                                    <Button
                                        className='w-fit bg-white text-black hover:bg-white/90
                                    hover:scale-105 transition-all duration-300 cursor-pointer
                                    flex items-center gap-2 group'
                                    >
                                        Shop Now
                                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-4 bg-white/10 hover:bg-white/20 border-0 cursor-pointer z-10' />
            <CarouselNext className='absolute right-[calc(33.333%+1rem)] bg-white/10 hover:bg-white/20 border-0 cursor-pointer z-10' />
        </Carousel>
    );
}
