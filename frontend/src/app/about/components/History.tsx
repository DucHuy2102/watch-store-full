import Image from 'next/image';

export default function History() {
    return (
        <div className='container mx-auto space-y-10'>
            <div>
                <div className='border-t-[3px] w-[9em] border-emerald-700/60' />
                <p className='pt-2 font-sans font-medium text-lg tracking-wide text-emerald-700'>
                    Rooted In History
                </p>
                <p className='mt-7 text-6xl font-serif text-start font-semibold'>
                    the watches that made us
                </p>
            </div>
            <div className='flex flex-row justify-between gap-10'>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/history/1.webp'}
                        alt='Classic Watchmaking'
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Classic Watchmaking, American Sensibility
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        The quintessential expression of Timex watchmaking.
                    </p>
                </div>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/history/2.jpg'}
                        alt='Quartz Changed Everything'
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Quartz Changed Everything
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        Capturing the innovative spirit of the ‘70s.
                    </p>
                </div>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/history/3.webp'}
                        alt='Our Mid-Century Icon'
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Our Mid-Century Icon
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        Smooth as the ‘60s.
                    </p>
                </div>
            </div>
        </div>
    );
}
