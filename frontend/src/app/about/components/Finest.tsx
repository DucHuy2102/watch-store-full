import Image from 'next/image';

export default function Finest() {
    return (
        <div className='container mx-auto border-t-[3px] border-zinc-800 space-y-10'>
            <div className='mt-10'>
                <p className='text-6xl font-serif text-center font-semibold'>our finest hour</p>
            </div>
            <div className='w-lg'>
                <p className='font-sans font-medium text-lg tracking-wide text-zinc-900/70'>
                    Our collaborations and iconic reissues transcend boundaries, resulting in
                    timepieces that redefine style while honoring our heritage.
                </p>
            </div>
            <div className='flex items-center justify-center gap-3'>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-lg font-serif text-center font-semibold text-zinc-900/80'>
                        01 Bold Collaborations
                    </p>
                    <Image
                        src={'/about-us/finest/1.webp'}
                        alt='Image 01'
                        width={430}
                        height={400}
                    />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-lg font-serif text-center font-semibold text-zinc-900/80'>
                        02 Future-Forward Design
                    </p>
                    <Image src={'/about-us/finest/2.jpg'} alt='Image 01' width={430} height={400} />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-lg font-serif text-center font-semibold text-zinc-900/80'>
                        03 Reissues From Our Archives
                    </p>
                    <Image
                        src={'/about-us/finest/3.webp'}
                        alt='Image 01'
                        width={430}
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
}
