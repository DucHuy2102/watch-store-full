'use client';

import { useEffect, useState } from 'react';
import {
    Product_Empty,
    LoadingComponent,
    Product_Grid,
    Product_Pagination,
    Product_Sort_Filter,
} from './components';
import { getAllProducts } from '@/api/product';
import { IProduct } from '@/lib/redux/interfaces/product.interface';

export default function Products() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [sort, setSort] = useState('');
    const [filters, setFilters] = useState<Record<string, string>>({
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

    // get all products from api
    // with query params: sort, filters, pagination
    const getProducts = async () => {
        try {
            setIsLoading(true);

            const queryParams = new URLSearchParams();
            if (sort) queryParams.append('sort', sort);

            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    queryParams.append(key, filters[key]);
                }
            });

            if (pagination) queryParams.append('pagination', JSON.stringify(pagination));
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

    // get sort, filters, pagination from query params
    // and set them to state on first render and on every change
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        // get sort from query params
        const currentSort = queryParams.get('sort');
        if (currentSort && currentSort !== sort) {
            setSort(currentSort);
        }

        // get filters from query params
        const newFilters = { ...filters };
        Object.keys(filters).forEach((key) => {
            const value = queryParams.get(key);
            if (value) {
                newFilters[key] = value;
            }
        });

        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters);
        }

        // get pagination from query params
        const currentPage = queryParams.get('page');
        if (currentPage) {
            setPagination((prev) => ({
                ...prev,
                currentPage: parseInt(currentPage, 10),
            }));
        }
    }, []);

    // get products from api on sort, filters, pagination change
    useEffect(() => {
        getProducts();
    }, [sort, filters, pagination.currentPage]);

    // sort function
    const handleSortChange = (value: string) => {
        setSort(value);
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set('sort', value);
        } else {
            url.searchParams.delete('sort');
        }
        window.history.pushState({}, '', url);
    };

    // filter function
    const handleFilterChange = (filterState: Record<string, string[]>) => {
        const newFilters: Record<string, string> = {};
        Object.entries(filterState).forEach(([key, values]) => {
            newFilters[key] = values.length > 0 ? values.join(',') : '';
        });
        setFilters(newFilters);

        const url = new URL(window.location.href);
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.pushState({}, '', url);
    };

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div
                    className='flex flex-col min-h-screen w-full overflow-hidden 
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
                            <Product_Pagination />
                        </main>
                    ) : (
                        <Product_Empty />
                    )}
                </div>
            )}
        </>
    );
}
