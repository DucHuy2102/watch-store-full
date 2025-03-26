'use client';

import { Button } from '@/components/ui/button';
import Breadcrumb_Product from './Breadcrumb';
import { Filter_Product, Sort_Product } from '..';

export default function Product_Sort_Filter() {
    return (
        <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col items-start gap-1'>
                <Breadcrumb_Product />
                <span className='text-2xl font-medium tracking-tight'>Men's watch</span>
            </div>
            <div className='flex items-center gap-2'>
                <Sort_Product />
                <Filter_Product />
            </div>
        </div>
    );
}
