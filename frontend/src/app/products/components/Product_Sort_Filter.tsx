'use client';

import { Product_Filter, Product_Sort } from '.';
import Breadcrumb_Product from './Product_Breadcrumb';

export default function Product_Sort_Filter() {
    return (
        <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col items-start gap-1'>
                <Breadcrumb_Product />
                <span className='text-2xl font-medium tracking-tight'>Men's watch</span>
            </div>
            <div className='flex items-center gap-2'>
                <Product_Sort />
                <Product_Filter />
            </div>
        </div>
    );
}
