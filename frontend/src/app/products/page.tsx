import { Product_Grid, Product_Pagination, Product_Sort_Filter } from './components';

export default function Products() {
    return (
        <div className='flex flex-col min-h-screen w-full overflow-hidden'>
            <main className='flex-grow min-h-screen px-5 md:px-10 py-1 md:py-3'>
                {/* sort and filter */}
                <Product_Sort_Filter />

                {/* products */}
                <Product_Grid />

                {/* pagination */}
                <Product_Pagination />
            </main>
        </div>
    );
}
