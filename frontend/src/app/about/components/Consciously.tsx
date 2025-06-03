import Image from 'next/image';

export default function Consciously() {
    return (
        <div className='container mx-auto space-y-10'>
            <div>
                <div className='border-t-[3px] w-[9em] border-emerald-700/60' />
                <p className='pt-2 font-sans font-medium text-lg tracking-wide text-emerald-700'>
                    Crafted To Keep Our Planet Ticking
                </p>
                <p className='mt-7 text-6xl font-serif text-start font-semibold'>
                    consciously made
                </p>
            </div>
            <div className='flex flex-row justify-between gap-10'>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/consciously/1.webp'}
                        alt='Timex ReWound'
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Timex ReWound
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        The world's first circular watch program. It's our mission to keep watches
                        on wrists and out of landfills.
                    </p>
                </div>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/consciously/2.webp'}
                        alt="Steps We've Made"
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Steps We've Made
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        We've removed 800,000+ plastic bottles from the ocean and upcycled them into
                        watch parts—with more every day.
                    </p>
                </div>
                <div className='flex flex-col items-center w-1/3'>
                    <Image
                        src={'/about-us/consciously/3.webp'}
                        alt='Our Sustainability Report'
                        width={430}
                        height={400}
                        className='rounded-sm object-cover mb-6'
                    />
                    <p className='text-2xl font-serif font-bold mb-2 text-zinc-900/80 text-left w-full'>
                        Our Sustainability Report
                    </p>
                    <p className='text-sm tracking-wide font-sans text-zinc-900/70 text-left w-full'>
                        Our goal is to reduce 50% of green house gas emissions by 2030 and net zero
                        by 2050.
                    </p>
                </div>
            </div>
        </div>
    );
}
