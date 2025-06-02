import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronUp } from 'lucide-react';
import { Product_Card } from '../../products/components';

export default function ProductEmpty() {
    const { theme } = useTheme();
    const router = useRouter();
    const compareProducts = useAppSelector((state) => state.product.productCompare);
    const imagePath = theme === 'dark' ? '/utils/dark_compare.webp' : '/utils/light_compare.webp';

    return (
        <div className='relative'>
            <div
                className='flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 
                bg-gradient-to-b from-background to-background/80'
            >
                <div className='relative w-full max-w-2xl aspect-[16/9] mb-8 overflow-hidden'>
                    <Image
                        src={imagePath}
                        alt='Compare Products'
                        fill
                        className='object-contain'
                        priority
                    />
                </div>
                <div className='text-center space-y-4'>
                    <h2 className='text-3xl font-serif font-medium text-foreground'>
                        Compare Your Timepieces
                    </h2>
                    <p className='text-muted-foreground max-w-md mx-auto'>
                        Select watches to compare their features, specifications, and find your
                        perfect match.
                    </p>
                    <div className='pt-4' onClick={() => router.push('/products')}>
                        <button
                            className='px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md 
                            cursor-pointer hover:bg-primary/90 transition-colors'
                        >
                            Browse Watches
                        </button>
                    </div>
                </div>
            </div>

            {compareProducts.length > 0 && (
                <Sheet>
                    <SheetTrigger className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors'>
                        <ChevronUp className='w-6 h-6' />
                    </SheetTrigger>
                    <SheetContent side='bottom' className='h-[80vh]'>
                        <div className='flex flex-col h-full'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-xl font-medium'>
                                    Products to Compare ({compareProducts.length})
                                </h3>
                                <button
                                    onClick={() => router.push('/compare')}
                                    className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                                >
                                    Compare Now
                                </button>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto'>
                                {compareProducts.map((product) => (
                                    <Product_Card key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
}
