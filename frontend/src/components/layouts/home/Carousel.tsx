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
        image: '/carousel/carousel_1.webp',
        title: 'Classic Elegance',
        description:
            'Timeless design meets modern craftsmanship. Our signature timepiece features premium materials and Swiss movement.',
        price: '$299.99',
        category: 'Luxury Collection',
    },
    {
        image: '/carousel/carousel_2.webp',
        title: 'Military Precision',
        description:
            'Inspired by military heritage, built for everyday adventures. Featuring 24-hour time and water resistance.',
        price: '$199.99',
        category: 'Sport Series',
    },
    {
        image: '/carousel/carousel_3.webp',
        title: 'Sport Chronograph',
        description:
            'Performance meets style. Track every second with precision in this sophisticated chronograph watch.',
        price: '$349.99',
        category: 'Professional Series',
    },
    {
        image: '/carousel/carousel_4.webp',
        title: 'Modern Classic',
        description:
            'The perfect blend of traditional watchmaking and contemporary design. A statement piece for any occasion.',
        price: '$279.99',
        category: 'Classic Collection',
    },
    {
        image: '/carousel/carousel_5.jpg',
        title: 'Vintage Collection',
        description:
            'A tribute to timeless style. Hand-finished details and premium leather strap make this piece truly special.',
        price: '$399.99',
        category: 'Heritage Series',
    },
];

export default function Carousel_Section() {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className='w-full h-[calc(100vh-4rem)] mt-2 mx-auto overflow-hidden relative'
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
                                className='object-cover transition-transform duration-700 hover:scale-105'
                                sizes='100vw'
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/70' />

                            <div
                                className='absolute top-0 right-0 w-1/3 h-full backdrop-blur-sm bg-black/40 text-white 
                                p-12 flex flex-col justify-center transform transition-transform duration-500'
                            >
                                <p className='text-sm tracking-widest uppercase text-white/70 mb-2'>
                                    {item.category}
                                </p>
                                <h2 className='text-5xl font-bold mb-6 tracking-tight'>
                                    {item.title}
                                </h2>
                                <div className='w-16 h-1 bg-white mb-8' />
                                <p className='text-lg mb-8 text-gray-300 leading-relaxed'>
                                    {item.description}
                                </p>
                                <p className='text-4xl font-light mb-8'>{item.price}</p>
                                <Link href='/products'>
                                    <Button
                                        className='w-full text-white bg-transparent border border-white
                                        hover:bg-white hover:text-black transition-all duration-300 font-sans
                                        flex items-center gap-2 text-lg px-8 py-6 rounded-full
                                        group shadow-lg hover:shadow-xl cursor-pointer'
                                    >
                                        Discover Now
                                        <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
                className='absolute left-8 bg-white/10 hover:bg-white/20 border-0 cursor-pointer z-10
                w-12 h-12 rounded-full transition-all duration-300 hover:scale-110'
            />
            <CarouselNext
                className='absolute right-[calc(33.333%+2rem)] bg-white/10 hover:bg-white/20 border-0 cursor-pointer z-10
                w-12 h-12 rounded-full transition-all duration-300 hover:scale-110'
            />
        </Carousel>
    );
}
