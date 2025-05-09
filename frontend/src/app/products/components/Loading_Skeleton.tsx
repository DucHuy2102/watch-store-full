import { Skeleton } from '@/components/ui/skeleton';

export default function Loading_Skeleton() {
    return (
        <div className='min-h-screen px-5 md:px-10 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <Skeleton className='aspect-square rounded-lg' />
                <div className='flex flex-col gap-6'>
                    <div>
                        <Skeleton className='h-8 w-1/3 mb-4' />
                        <Skeleton className='h-12 w-2/3 mb-2' />
                        <Skeleton className='h-8 w-1/4' />
                    </div>
                    <Skeleton className='h-px w-full' />
                    <div className='grid grid-cols-2 gap-4'>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className='h-16' />
                        ))}
                    </div>
                    <Skeleton className='h-px w-full' />
                    <Skeleton className='h-12 w-full' />
                </div>
            </div>
        </div>
    );
}
