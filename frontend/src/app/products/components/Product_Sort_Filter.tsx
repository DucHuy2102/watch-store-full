'use client';

import { IProductSortFilter } from '@/lib/redux/interfaces/product.interface';
import { Product_Filter, Product_Sort } from '.';
import Breadcrumb_Product from './Product_Breadcrumb';
import { useSearchParams } from 'next/navigation';

export default function Product_Sort_Filter({
    filters,
    onFilterChange,
    sort,
    onSortChange,
}: IProductSortFilter) {
    const searchParams = useSearchParams();
    const gender = searchParams.get('gender');
    const watchStyle = searchParams.get('style');
    const breadcumLink = watchStyle
        ? `${watchStyle} watches for Men`
        : gender === 'Men'
        ? "Best Selling men's Watches"
        : "Best Selling women's Watches";

    const breadcumPage = watchStyle
        ? `${watchStyle} watches for Men`
        : gender === 'Men'
        ? "Best Selling Men's Watches"
        : "Best Selling Women's Watches";

    return (
        <div className='w-full flex items-center justify-between mb-3'>
            <div className='flex flex-col items-start gap-1'>
                <Breadcrumb_Product breadcumLink={breadcumLink} />
                <span className='text-2xl font-medium tracking-tight'>{breadcumPage}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Product_Sort sort={sort} onSortChange={onSortChange} />
                <Product_Filter filters={filters} onFilterChange={onFilterChange} />
            </div>
        </div>
    );
}
