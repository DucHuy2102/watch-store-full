'use client';

import { IProduct } from '@/lib/redux/interfaces/product.interface';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Images_SectionProps = {
    product: IProduct;
    activeImageIndex: number;
    setActiveImageIndex: (index: number) => void;
};

const cleanImageUrl = (url: string) => {
    return url.split('&width=')[0];
};

export default function Images({
    product,
    activeImageIndex,
    setActiveImageIndex,
}: Images_SectionProps) {
    const hasThumbnail = product.variant.thumbnail;
    const containerRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const [isFixed, setIsFixed] = useState(false);
    const [topValue, setTopValue] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current && thumbnailRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const thumbnailHeight = thumbnailRef.current.offsetHeight;

                if (containerRect.top <= 0 && containerRect.bottom >= thumbnailHeight) {
                    setIsFixed(true);
                    setTopValue(0);
                } else if (containerRect.bottom < thumbnailHeight) {
                    setIsFixed(false);
                    setTopValue(containerRect.height - thumbnailHeight);
                } else {
                    setIsFixed(false);
                    setTopValue(0);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className='px-5 my-5 w-full flex gap-4 relative'>
            <div className={`grid ${hasThumbnail ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
                {product.variant.images.map((image, index) => (
                    <div
                        key={index}
                        className='relative aspect-square bg-gray-200/60
              overflow-hidden flex items-center justify-center'
                    >
                        <Image
                            src={cleanImageUrl(image)}
                            alt={`View ${index + 1}`}
                            width={400}
                            height={400}
                            className='object-cover'
                        />
                    </div>
                ))}
            </div>

            {hasThumbnail && (
                <div
                    ref={thumbnailRef}
                    className='overflow-hidden aspect-square flex items-center justify-center'
                    style={{
                        position: isFixed ? 'fixed' : 'absolute',
                        top: isFixed ? 0 : topValue,
                        right: '0',
                    }}
                >
                    <Image
                        src={cleanImageUrl(product.variant.images[7])}
                        alt='Main product view'
                        width={670}
                        height={670}
                        className='object-cover'
                    />
                </div>
            )}
        </div>
    );
}
