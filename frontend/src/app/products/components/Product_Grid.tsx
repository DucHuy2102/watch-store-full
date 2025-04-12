import { Product_Card } from '.';
import { IProduct } from '@/lib/redux/interfaces/product.interface';

export default function Product_Grid({ products }: { products: IProduct[] }) {
    return (
        <div className='mt-5 grid grid-cols-3 gap-7'>
            {products?.map((p, index) => {
                const defaultVariant =
                    p.variants.find((v) => v._id === p.defaultVariantId) || p.variants[0];
                return (
                    <Product_Card
                        key={index}
                        id={p._id}
                        name={p.name}
                        price={defaultVariant.sellPrice}
                        images={defaultVariant.images.slice(0, 3)}
                    />
                );
            })}
        </div>
    );
}
