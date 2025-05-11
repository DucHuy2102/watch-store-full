'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { MdCompareArrows } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { IProduct } from '@/lib/redux/interfaces/product.interface';
import { getProductById, getRelatedProducts } from '@/api/product';
import {
    Infomation_Section,
    Loading_Skeleton,
    Product_Empty,
    Product_Related,
    Size_Guide,
} from '../components';
import { ChevronDownIcon } from 'lucide-react';

type ButtonItemProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
};
export const ButtonItem = ({ title, isOpen, onToggle, rightElement }: ButtonItemProps) => {
    return (
        <button
            className='w-full py-6 flex items-center justify-between text-left'
            onClick={onToggle}
        >
            <h2 className='text-xl font-bold'>{title}</h2>
            <div className='flex items-center'>
                {rightElement}
                <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>
        </button>
    );
};

type SpecificationItemProps = {
    label: string;
    value: string | number;
    unit?: string;
};

export const SpecificationItem = ({ label, value, unit }: SpecificationItemProps) => {
    return (
        <div className='py-2'>
            <div className='flex'>
                <span className='font-medium text-sm'>{label}:</span>
                <span className='ml-1 font-medium text-sm text-zinc-700 dark:text-zinc-300'>
                    {value} {unit ?? ''}
                </span>
            </div>
        </div>
    );
};

const cleanImageUrl = (url: string) => {
    return url.split('&width=')[0];
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
    const [isReturnsOpen, setIsReturnsOpen] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (typeof id === 'string') {
                    const res = await getProductById(id);
                    setProduct(res?.product);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    useEffect(() => {
        const getRelated_Products = async () => {
            try {
                if (product) {
                    const res = await getRelatedProducts(product.watchStyle);
                    setRelatedProducts(res?.products);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        if (product) getRelated_Products();
    }, [product]);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleCompareClick = () => {
        setIsCompared(!isCompared);
    };

    if (loading) return <Loading_Skeleton />;

    if (!product) {
        return <Product_Empty />;
    }

    return (
        <div className='overflow-hidden min-h-screen'>
            {/* top section */}
            <div className='relative'>
                <div className='aspect-[2/1] overflow-hidden'>
                    <Image
                        src={cleanImageUrl(
                            product.variant.thumbnail ?? product.variant.images[activeImageIndex]
                        )}
                        alt={product.name}
                        width={1980}
                        height={1980}
                        className='w-full h-full object-cover'
                        priority
                    />
                </div>
                <div className='absolute top-[20%] w-md right-20 rounded-md bg-zinc-100 py-16 px-10'>
                    <div className='flex flex-col gap-5 text-zinc-800 font-medium'>
                        <div className='text-xl font-bold'>{product.name}</div>
                        <div>{product.specifications.caseDiameter} mm</div>
                        <div>
                            Color: <span className='text-zinc-800/60'>{product.variant.color}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            {product.variant.sellPrice === product.variant.originPrice ? (
                                <div className='text-xl'>
                                    {formatPrice(product.variant.sellPrice)}
                                </div>
                            ) : (
                                <>
                                    <div className='text-xl'>
                                        {formatPrice(product.variant.sellPrice)}
                                    </div>
                                    <div className='text-lg line-through text-red-500/70'>
                                        {formatPrice(product.variant.originPrice)}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='flex items-center justify-center gap-2 w-full'>
                            <Button
                                variant={'outline'}
                                className='p-5 hover:bg-red-500 transition-colors duration-150 group 
                                border-none dark:hover:bg-red-500 dark:bg-white cursor-pointer'
                                size={'lg'}
                            >
                                <FiHeart className='h-5 w-5 group-hover:text-white transition-colors duration-150' />
                            </Button>
                            <Button
                                className='w-full hover:bg-blue-500 dark:bg-zinc-900 dark:text-white
                                 transition-colors duration-200 flex-1 py-5 text-base font-medium group'
                                size='lg'
                            >
                                <FiShoppingCart
                                    className='mr-2 h-5 w-5 group-hover:animate-bounce 
                                transition-transform duration-150'
                                />
                                Add to Cart
                            </Button>
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer hover:underline hover:text-amber-500'>
                            <MdCompareArrows />
                            Compare
                        </div>
                    </div>
                </div>
            </div>

            {/* images section */}

            {/* description & specification section */}
            <div className='flex items-start justify-center gap-10 w-full py-10 px-16'>
                {/* description */}
                <div className='w-2/3'>
                    <div className='py-6 flex flex-col items-start gap-3'>
                        <h2 className='text-3xl font-semibold tracking-wide'>
                            A Fresh Dial Design Straight from the '60s
                        </h2>
                        <p className='font-medium tracking-wide text-zinc-700 dark:text-zinc-300'>
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className='flex flex-1 flex-col gap-6'>
                    {/* specifications */}
                    <div className='border-b border-zinc-200 dark:border-zinc-800'>
                        <ButtonItem
                            title='Specifications'
                            isOpen={isSpecsOpen}
                            onToggle={() => setIsSpecsOpen(!isSpecsOpen)}
                        />
                        {isSpecsOpen && (
                            <div className='pb-6'>
                                <div className='flex items-start justify-between gap-5'>
                                    <div>
                                        <SpecificationItem
                                            label='Total Sold'
                                            value={`${product.variant.totalSold} ${
                                                product.variant.totalSold >= 2
                                                    ? 'products'
                                                    : 'product'
                                            }`}
                                        />
                                        <SpecificationItem
                                            label='Watch Movement'
                                            value={
                                                product.specifications.movementType ||
                                                'Mechanical Automatic'
                                            }
                                        />
                                        <SpecificationItem
                                            label='Water Resistance'
                                            value={
                                                product.specifications.waterResistance ||
                                                '50 meters'
                                            }
                                            unit='meters'
                                        />
                                        <SpecificationItem
                                            label='Crystal / Lens'
                                            value={product.specifications.crystalLens || 'Acrylic'}
                                        />

                                        <SpecificationItem
                                            label='Case Diameter'
                                            value={product.specifications.caseDiameter}
                                            unit='mm'
                                        />

                                        <SpecificationItem
                                            label='Case Height'
                                            value={product.specifications.caseHeight}
                                            unit='mm'
                                        />
                                        <SpecificationItem
                                            label='Case Material'
                                            value={
                                                product.specifications.caseMaterial ||
                                                'Stainless Steel'
                                            }
                                        />
                                        <SpecificationItem
                                            label='Case Color'
                                            value={
                                                product.specifications.caseColor ||
                                                'Stainless Steel'
                                            }
                                        />
                                    </div>

                                    <div>
                                        <SpecificationItem
                                            label='Case Finish'
                                            value={product.specifications.caseFinish || 'Polished'}
                                        />
                                        <SpecificationItem
                                            label='Dial Color'
                                            value={product.specifications.dialColor || 'Black'}
                                        />
                                        <SpecificationItem
                                            label='Dial Markings'
                                            value={
                                                product.specifications.dialMarkings ||
                                                'Arabic (Partial)'
                                            }
                                        />
                                        <SpecificationItem
                                            label='Strap / Lug Width'
                                            value={product.specifications.strapLugWidth}
                                            unit='mm'
                                        />
                                        <SpecificationItem
                                            label='Strap Material'
                                            value={
                                                product.specifications.strapMaterial ||
                                                'Stainless Steel'
                                            }
                                        />
                                        <SpecificationItem
                                            label='Strap Color'
                                            value={product.variant.color || 'Stainless Steel'}
                                        />
                                        <SpecificationItem
                                            label='Strap Buckle'
                                            value={product.specifications.strapBuckle || 'Buckle'}
                                        />
                                        <SpecificationItem
                                            label='Battery Type'
                                            value={
                                                product.specifications.batteryType || 'Automatic'
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* delivery & returns */}
                    <div className='border-b border-zinc-200 dark:border-zinc-800'>
                        <ButtonItem
                            title='Delivery & Returns'
                            isOpen={isDeliveryOpen}
                            onToggle={() => setIsDeliveryOpen(!isDeliveryOpen)}
                        />

                        {isDeliveryOpen && (
                            <div className='pb-6'>
                                <p className='text-zinc-700 font-semibold dark:text-zinc-300'>
                                    Free Standard Shipping on most orders. Fan Shop orders do not
                                    qualify for free shipping. Buy two straps get free Standard
                                    Shipping. Get your refund faster with easy online returns! Mail
                                    your items back with our return label within 30 days.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* size guide */}
                    <Size_Guide
                        name={product.name}
                        caseDiameter={product.specifications.caseDiameter}
                    />

                    {/* product user manual */}
                    <div>
                        <ButtonItem
                            title='Product User Manual'
                            isOpen={isManualOpen}
                            onToggle={() => setIsManualOpen(!isManualOpen)}
                            rightElement={<Badge className='mr-2 text-sm'>PDF</Badge>}
                        />

                        {isManualOpen && (
                            <div className='pb-6'>
                                <p className='text-zinc-700 dark:text-zinc-300'>
                                    Download the product manual for detailed instructions on how to
                                    use and care for your watch.
                                </p>
                                <Button variant='outline' className='mt-4'>
                                    Download PDF
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* bottom section */}
            <Infomation_Section />

            {/* related products */}
            <Product_Related products={relatedProducts} />

            {/* comments section */}
        </div>
    );
}
