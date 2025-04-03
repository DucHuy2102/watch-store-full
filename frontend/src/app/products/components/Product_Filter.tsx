'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const brands = [
    'Rolex',
    'Omega',
    'TAG Heuer',
    'Cartier',
    'Patek Philippe',
    'Audemars Piguet',
    'IWC',
    'Breitling',
];

const styles = [
    'Dress Watch',
    'Dive Watch',
    'Chronograph',
    'Pilot Watch',
    'Field Watch',
    'Smart Watch',
    'Luxury Watch',
];

const features = [
    'Water Resistant',
    'Automatic Movement',
    'Chronometer Certified',
    'Sapphire Crystal',
    'Luminous Hands',
    'Date Display',
];

export default function Product_Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const filterRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const toggleStyle = (style: string) => {
        setSelectedStyles((prev) =>
            prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
        );
    };

    const toggleFeature = (feature: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedStyles([]);
        setSelectedFeatures([]);
    };

    const totalFilters = selectedBrands.length + selectedStyles.length + selectedFeatures.length;

    return (
        <>
            <Button
                ref={filterRef}
                onClick={() => setIsOpen(true)}
                variant='outline'
                className='flex items-center gap-2'
            >
                <FiFilter className='w-4 h-4' />
                Filter
            </Button>

            {isOpen && (
                <div className='fixed inset-0 bg-black/50 z-50'>
                    <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 shadow-xl flex flex-col'>
                        <div className='flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800'>
                            <h2 className='text-xl font-semibold'>Filters</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full'
                            >
                                <IoClose className='w-5 h-5 cursor-pointer' />
                            </button>
                        </div>

                        <div className='flex-1 overflow-y-auto p-6'>
                            <div className='pb-6 border-b border-zinc-200 dark:border-zinc-800'>
                                <h3 className='text-sm font-medium mb-4'>Brands</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {brands.map((brand) => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors
                                                ${
                                                    selectedBrands.includes(brand)
                                                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100'
                                                }`}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='py-6 border-b border-zinc-200 dark:border-zinc-800'>
                                <h3 className='text-sm font-medium mb-4'>Watch Styles</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {styles.map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => toggleStyle(style)}
                                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors
                                                ${
                                                    selectedStyles.includes(style)
                                                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100'
                                                }`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='py-6 border-b border-zinc-200 dark:border-zinc-800'>
                                <h3 className='text-sm font-medium mb-4'>Features</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {features.map((feature) => (
                                        <button
                                            key={feature}
                                            onClick={() => toggleFeature(feature)}
                                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors
                                                ${
                                                    selectedFeatures.includes(feature)
                                                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100'
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='p-6'>
                            <div className='flex items-center justify-between gap-4'>
                                <Button variant='outline' onClick={clearFilters} className='flex-1'>
                                    Clear All
                                </Button>
                                <Button onClick={() => setIsOpen(false)} className='flex-1'>
                                    Apply Filters ({totalFilters})
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
