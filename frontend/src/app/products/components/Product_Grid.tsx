import { Product_Card } from '.';

export default function Product_Grid() {
    return (
        <div className='mt-5 grid grid-cols-3 gap-7'>
            <Product_Card
                id='1'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='2'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='3'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='4'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='5'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='6'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='7'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
            <Product_Card
                id='8'
                name='Marlin® Chronograph Tachymeter 40mm Leather Strap Watch'
                price={6280000}
                images={['/shop_now/men.webp', '/shop_now/girl.webp']}
            />
        </div>
    );
}
