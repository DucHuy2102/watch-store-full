import { Footer, Navbar } from '@/components/layouts';
import { Product_Grid, Product_Pagination, Product_Sort_Filter } from './components';

export default function Products() {
    return (
        <div className='flex flex-col min-h-screen w-full overflow-hidden'>
            <Navbar />
            <main className='flex-grow min-h-screen px-5 md:px-10 py-1 md:py-3'>
                <Product_Sort_Filter />
                <Product_Grid />
                <Product_Pagination />
            </main>
            <Footer />
        </div>
    );
}
