import { ProductCompare_Component } from '@/app/compare/components';
import { Product_Card } from '.';
import { IProduct } from '@/lib/redux/interfaces/product.interface';

export default function Product_Grid({ products }: { products: IProduct[] }) {
    return (
        <>
            <div className='mt-5 grid grid-cols-3 lg:gap-7 2xl:gap-10'>
                {products?.map((p, index) => {
                    return <Product_Card key={index} product={p} isCompare={false} />;
                })}
            </div>

            <ProductCompare_Component />
        </>
    );
}
