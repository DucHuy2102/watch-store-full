'use client';

import { useEffect, useState } from 'react';
import {
    Product_Empty,
    Product_Grid,
    Product_Pagination,
    Product_Sort_Filter,
    Loading_ProductGrid,
} from './components';
import { getAllProducts } from '@/api/product';
import { IProduct } from '@/lib/redux/interfaces/product.interface';
import { useSearchParams } from 'next/navigation';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Products() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [sort, setSort] = useState('');
    const [filters, setFilters] = useState<Record<string, string>>({
        gender: '',
        style: '',
        stockStatus: '',
        movementType: '',
        caseDiameter: '',
        strapLugWidth: '',
        features: '',
        strapMaterial: '',
        waterResistance: '',
        crystalLens: '',
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const searchValue = searchParams.get('search') || '';
        setSearchProduct(searchValue);

        const newFilters: Record<string, string> = { ...filters };
        Object.keys(newFilters).forEach((key) => {
            newFilters[key] = searchParams.get(key) || '';
        });

        const styleValue = searchParams.get('style') || '';
        const sortValue = searchParams.get('sort') || '';
        const currentPage = parseInt(searchParams.get('page') || '1', 10);

        setFilters(newFilters);
        setSort(sortValue);
        setPagination((prev) => ({
            ...prev,
            currentPage,
        }));

        const getProductsData = async () => {
            try {
                setIsLoading(true);
                const queryParams = new URLSearchParams();

                if (searchValue) queryParams.append('search', capitalize(searchValue));

                if (sortValue) queryParams.append('sort', sortValue);
                if (styleValue) queryParams.set('style', styleValue);
                Object.keys(newFilters).forEach((key) => {
                    if (newFilters[key]) {
                        queryParams.set(key, newFilters[key]);
                    }
                });
                queryParams.append('page', currentPage.toString());

                const res = await getAllProducts(queryParams.toString());
                const { totalProducts, currentPage: resPage, totalPages, products } = res;
                setProducts(products);
                setPagination({
                    totalProducts,
                    currentPage: resPage,
                    totalPages,
                });

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getProductsData();
    }, [searchParams]);

    // sort function
    const handleSortChange = (value: string) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set('sort', value);
        } else {
            url.searchParams.delete('sort');
        }
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    };

    // filter function
    const handleFilterChange = (filterState: Record<string, string[]>) => {
        const url = new URL(window.location.href);
        Object.entries(filterState).forEach(([key, value]) => {
            if (value && value.length > 0) {
                url.searchParams.set(key, value.join(','));
            } else {
                url.searchParams.delete(key);
            }
        });
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    };

    // pagination function
    const handlePageChange = (page: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        window.history.pushState({}, '', url);
    };

    if (isLoading) return <Loading_ProductGrid />;

    return (
        <div
            className='flex flex-col justify-center items-center min-h-screen w-full overflow-hidden 
                px-5 md:px-10 py-1 md:py-3'
        >
            {/* sort and filter */}
            <Product_Sort_Filter
                filters={filters}
                onFilterChange={handleFilterChange}
                sort={sort}
                onSortChange={handleSortChange}
            />

            {products?.length > 0 ? (
                <main className='flex-grow min-h-screen'>
                    {/* products */}
                    <Product_Grid products={products} />

                    {/* pagination */}
                    <Product_Pagination {...pagination} onPageChange={handlePageChange} />
                </main>
            ) : (
                <Product_Empty />
            )}
        </div>
    );
}
