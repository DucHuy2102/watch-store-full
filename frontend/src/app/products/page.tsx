'use client';

import { useEffect, useState } from 'react';
import {
    LoadingComponent,
    Product_Grid,
    Product_Pagination,
    Product_Sort_Filter,
} from './components';
import { getAllProducts } from '@/api/product';
import { IProduct } from '@/lib/redux/interfaces/product.interface';

export default function Products() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filters, setFilters] = useState({
        limit: '2',
        brand: '',
        gender: 'Male',
        dialColor: '',
        movementType: '',
        caseMaterial: '',
        waterResistance: '',
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);

            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });
            console.log('----->', queryParams.toString());
            const res = await getAllProducts(queryParams.toString());
            const { totalProducts, currentPage, totalPages, products } = res;
            setProducts(products);
            setPagination({ totalProducts, currentPage, totalPages });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className='flex flex-col min-h-screen w-full overflow-hidden'>
                    <main className='flex-grow min-h-screen px-5 md:px-10 py-1 md:py-3'>
                        {/* sort and filter */}
                        <Product_Sort_Filter />

                        {/* products */}
                        <Product_Grid products={products} />

                        {/* pagination */}
                        <Product_Pagination />
                    </main>
                </div>
            )}
        </>
    );
}
