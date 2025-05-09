import { Product_Card } from '.';
import { IProduct } from '@/lib/redux/interfaces/product.interface';

export default function Product_Grid({ products }: { products: IProduct[] }) {
    return (
        <div className='mt-5 grid grid-cols-3 lg:gap-7 2xl:gap-10'>
            {products?.map((p, index) => {
                return (
                    <Product_Card
                        key={index}
                        id={p._id}
                        name={p.name}
                        price={p.variant.sellPrice}
                        images={p.variant.images.slice(0, 3)}
                    />
                );
            })}
        </div>
    );
}
