import { Product_Card } from '@/app/products/components';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { IProduct } from '@/lib/redux/interfaces/product.interface';
import { clearProductCompare, removeProductCompare } from '@/lib/redux/slices/productSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Compare() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const compareProducts = useAppSelector((state) => state.product.productCompare);
    const [isCompareVisible, setIsCompareVisible] = useState(true);

    const handleRemoveProduct = (product: IProduct) => {
        dispatch(removeProductCompare(product));
    };

    const handleClearAllProduct = () => {
        dispatch(clearProductCompare());
        setIsCompareVisible(true);
        toast.info('Removed all products from list');
    };

    const handleCompareProducts = () => {
        if (compareProducts.length < 2) {
            toast.error('Add at least 2 products to compare');
            return;
        }
        router.push('/compare');
    };

    return (
        <>
            {compareProducts.length > 0 && isCompareVisible && (
                <div
                    className='fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 
                dark:border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out'
                >
                    <div className='container mx-auto px-4 py-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-4'>
                                <h3 className='text-xl font-medium'>
                                    Products to Compare ({compareProducts.length}/3)
                                </h3>
                                <button
                                    onClick={() => setIsCompareVisible(false)}
                                    className='p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors'
                                >
                                    <FiChevronDown className='w-5 h-5' />
                                </button>
                            </div>
                            <div className='flex items-center justify-center gap-5'>
                                <button
                                    onClick={handleClearAllProduct}
                                    className='px-8 py-2 bg-red-500 text-primary-foreground 
                                    rounded-md hover:bg-red-600/90 transition-colors cursor-pointer'
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={handleCompareProducts}
                                    className={`px-4 py-2 text-primary-foreground rounded-md ${
                                        compareProducts.length < 2
                                            ? 'bg-primary hover:bg-primary/90'
                                            : 'bg-blue-600 hover:bg-blue-600/80'
                                    } transition-colors cursor-pointer`}
                                >
                                    Compare Now
                                </button>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {compareProducts.map((product) => (
                                <div key={product._id} className='relative'>
                                    <button
                                        onClick={() => handleRemoveProduct(product)}
                                        className='absolute -top-2 -right-2 z-10 bg-red-500 text-white 
                                        rounded-full p-1 hover:bg-red-600 transition-colors'
                                    >
                                        <FiX className='w-4 h-4' />
                                    </button>
                                    <Product_Card product={product} isCompare={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {compareProducts.length > 0 && !isCompareVisible && (
                <button
                    onClick={() => setIsCompareVisible(true)}
                    className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary cursor-pointer
                    text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors'
                >
                    Show Compare ({compareProducts.length}/3)
                </button>
            )}
        </>
    );
}
