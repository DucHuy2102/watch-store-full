'use client';

import { RootState } from '@/lib/redux/store';
import { ProductCompare_Empty } from './components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useAppDispatch } from '@/lib/redux/hooks';
import { removeProductCompare } from '@/lib/redux/slices/productSlice';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { IProduct } from '@/lib/redux/interfaces/product.interface';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

type SpecificationKey = keyof IProduct['specifications'];
type DisplayMode = 'all' | 'similar' | 'different';

export default function CompareProducts() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const compareProducts = useSelector((state: RootState) => state.product.productCompare);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('all');

    if (compareProducts.length < 2) return <ProductCompare_Empty />;

    const getCommonSpecs = () => {
        if (compareProducts.length < 2) return [];
        const specs = Object.keys(compareProducts[0].specifications) as SpecificationKey[];
        return specs.filter((spec) =>
            compareProducts.every(
                (product) =>
                    product.specifications[spec] === compareProducts[0].specifications[spec]
            )
        );
    };

    const getDifferentSpecs = () => {
        if (compareProducts.length < 2) return [];
        const specs = Object.keys(compareProducts[0].specifications) as SpecificationKey[];
        return specs.filter(
            (spec) =>
                !compareProducts.every(
                    (product) =>
                        product.specifications[spec] === compareProducts[0].specifications[spec]
                )
        );
    };

    const getPriceColor = (price: number) => {
        const allProductPrices = compareProducts.map((p) => p.variant.sellPrice);
        const minPrice = Math.min(...allProductPrices);
        const maxPrice = Math.max(...allProductPrices);

        if (price === minPrice) return 'text-green-600 dark:text-green-400';
        if (price === maxPrice) return 'text-orange-600 dark:text-orange-400';
        return 'text-primary';
    };

    const commonSpecs = getCommonSpecs();
    const differentSpecs = getDifferentSpecs();

    const displaySpecs =
        displayMode === 'all'
            ? [...commonSpecs, ...differentSpecs]
            : displayMode === 'similar'
            ? commonSpecs
            : differentSpecs;

    return (
        <div className='min-h-screen pt-5 bg-gradient-to-b from-background to-background/80'>
            <div className='container mx-auto px-4'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-serif font-medium text-center mb-3'>
                        Compare Timepieces
                    </h1>
                    <p className='text-muted-foreground text-center max-w-2xl mx-auto mb-3'>
                        Discover the perfect watch by comparing specifications, features, and design
                        elements
                    </p>

                    <div className='flex justify-center'>
                        <Select
                            value={displayMode}
                            onValueChange={(value: DisplayMode) => setDisplayMode(value)}
                        >
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder='Select display mode' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>
                                    Show <strong>All</strong> Features
                                </SelectItem>
                                <SelectItem value='similar'>
                                    Show <strong>Similar</strong> Features
                                </SelectItem>
                                <SelectItem value='different'>
                                    Show <strong>Different</strong> Features
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='border-b border-border'>
                                <th className='p-4 text-left font-medium text-muted-foreground'>
                                    Features of {compareProducts.length} products
                                </th>
                                {compareProducts.map((product) => (
                                    <th key={product._id} className='p-4 text-center'>
                                        <div className='relative'>
                                            <button
                                                onClick={() =>
                                                    dispatch(removeProductCompare(product))
                                                }
                                                className='absolute -top-2 -right-2 p-1 hover:bg-destructive/10 rounded-full transition-colors'
                                            >
                                                <FiX className='w-4 h-4' />
                                            </button>
                                            <div className='aspect-square relative w-80 mx-auto mb-4'>
                                                <Image
                                                    src={product.variant.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className='object-contain'
                                                />
                                            </div>
                                            <h2
                                                onClick={() =>
                                                    router.push(`/products/${product._id}`)
                                                }
                                                className='text-sm font-medium mb-2 hover:underline hover:text-blue-500 transition-colors hover:cursor-pointer'
                                            >
                                                {product.name}
                                            </h2>
                                            <Badge
                                                className={`text-lg font-medium px-10 bg-zinc-300/30 ${getPriceColor(
                                                    product.variant.sellPrice
                                                )}`}
                                            >
                                                {formatPrice(product.variant.sellPrice)}
                                            </Badge>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displaySpecs.map((spec) => (
                                <tr
                                    key={spec}
                                    className='border-b border-border hover:bg-muted/50 transition-colors'
                                >
                                    <td className='py-4 px-1 w-lg font-medium text-muted-foreground'>
                                        {spec
                                            .replace(/([A-Z])/g, ' $1')
                                            .charAt(0)
                                            .toUpperCase() +
                                            spec.replace(/([A-Z])/g, ' $1').slice(1)}
                                    </td>
                                    {compareProducts.map((product) => (
                                        <td key={product._id} className='p-4 text-center'>
                                            {product.specifications[spec]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
