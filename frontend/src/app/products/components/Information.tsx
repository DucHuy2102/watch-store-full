import Image from 'next/image';

type InfoItemProps = {
    imgSrc: string;
    title: string;
    desc: string;
};

const InfoItem = ({ imgSrc, title, desc }: InfoItemProps) => {
    return (
        <div className='flex flex-col items-start gap-3 text-white p-6 border-l border-zinc-400 dark:border-zinc-500'>
            <div className={`mb-2 ${title === 'Fits Wrist Circumferences 150 - 205mm' && 'pt-3'}`}>
                <Image
                    src={imgSrc}
                    alt={title}
                    width={
                        title === 'Fits Wrist Circumferences 150 - 205mm'
                            ? 45
                            : title === 'Water Resistant to 50 Meters'
                            ? 30
                            : 40
                    }
                    height={45}
                    className='brightness-200'
                />
            </div>
            <h2
                className={`text-lg tracking-wide font-medium ${
                    title === 'Fits Wrist Circumferences 150 - 205mm' ? 'pt-5' : 'pt-1'
                }`}
            >
                {title}
            </h2>
            <p className='text-sm text-zinc-300 leading-relaxed'>{desc}</p>
        </div>
    );
};

export default function Information() {
    return (
        <div className='w-full relative'>
            <div className='flex items-center justify-center gap-2 opacity-95 overflow-hidden bg-zinc-700'>
                <Image
                    src='/informations/watch1.webp'
                    alt='Watch background'
                    width={1000}
                    height={1000}
                    className='object-cover'
                />
                <Image
                    src='/informations/watch2.webp'
                    alt='Watch background'
                    width={1000}
                    height={1000}
                    className='object-cover'
                />
            </div>
            <div
                className='absolute inset-0 top-0 left-0 right-0 grid grid-cols-3 gap-10 
            bg-zinc-800/90 dark:bg-zinc-700/70 py-20 px-10'
            >
                <InfoItem
                    imgSrc='/informations/movement.svg'
                    title='Automatic Movement'
                    desc='Automatic watches have no battery. Instead, these "self winding" movements use the natural movement of your wrist as a power source.'
                />
                <InfoItem
                    imgSrc='/informations/crystal.svg'
                    title='Scratch Resistant Sapphire Crystal'
                    desc='A double-domed sapphire crystal glass face provides scratch resistance and helps to reduce visual distortion of the dial for a clearer display.'
                />
                <InfoItem
                    imgSrc='/informations/watch-case.svg'
                    title='Stainless Steel Watch Case'
                    desc="Stainless steel is highly resistant to scratches, corrosion, and tarnish, ensuring your watch remains in excellent condition over time. It's also hypoallergenic and incredibly strong."
                />
                <InfoItem
                    imgSrc='/informations/strap.svg'
                    title='Soft Silicone Rubber Strap'
                    desc='This particular type of strap is soft to the touch, incredibly durable, and resistant to both heat and corrosion.'
                />
                <InfoItem
                    imgSrc='/informations/fit-wrist.svg'
                    title='Fits Wrist Circumferences 150 - 205mm'
                    desc='This watch fits wrist circumferences between 150 - 205mm (5.9 - 8.1in). We suggest using a garment measuring tape to ensure an accurate fit to your wrist.'
                />
                <InfoItem
                    imgSrc='/informations/water.svg'
                    title='Water Resistant to 50 Meters'
                    desc='This watch is suitable for light swimming. It is not suitable for snorkelling, or poolside diving. To maintain water resistance, do not press any buttons while underwater.'
                />
            </div>
        </div>
    );
}
