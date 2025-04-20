import { Button } from '@/components/ui/button';

export default function Product_Empty() {
    return (
        <div className='text-center py-44 text-zinc-800 dark:text-zinc-200'>
            <span className='text-7xl inline-block mb-5 tracking-widest'>404</span>
            <p className='text-xl text-red-400 font-semibold'>
                We're sorry, no products were found !!!
            </p>
            <p className='text-sm font-medium mt-2'>
                Please try adjusting your search filters or use the search bar to find what you're
                looking for.
            </p>
            <Button className='mt-5 w-sm'>
                <a href='/'>Back to Homepage</a>
            </Button>
        </div>
    );
}
