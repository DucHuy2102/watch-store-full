'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDownIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ItemProps {
    size: number;
    isSelected: boolean;
    onClick: () => void;
}
const SizeItem = ({ size, isSelected, onClick }: ItemProps) => {
    return (
        <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${
                isSelected ? 'bg-black text-white' : ''
            }`}
            onClick={onClick}
        >
            {size}
        </div>
    );
};

const Image_Size_Guide = (wrist: number, watch: number) => {
    return `/size_guide/${wrist}_${watch}.webp`;
};

export default function Size_Guide({ name, caseDiameter }: { name: string; caseDiameter: number }) {
    const [wristSize, setWristSize] = useState(6);
    const [watchSize, setWatchSize] = useState(25);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (wristSize === 7) {
            setWatchSize(25);
        }
    }, [wristSize]);

    return (
        <div className='border-b border-zinc-200 dark:border-zinc-800'>
            <div className='border-b border-zinc-200 dark:border-zinc-800'>
                <Sheet>
                    <button
                        className='w-full py-6 flex items-center justify-between text-left'
                        onClick={() => {}}
                    >
                        <SheetTrigger asChild>
                            <div className='flex items-center justify-between w-full'>
                                <h2 className='text-xl font-bold'>Size Guide</h2>
                                <ChevronDownIcon className='w-4 h-4' />
                            </div>
                        </SheetTrigger>
                    </button>

                    <SheetContent side='left' className='w-full overflow-y-auto'>
                        <SheetHeader>
                            <SheetTitle className='text-xl font-medium'>Size Guide</SheetTitle>
                            <SheetClose />
                        </SheetHeader>

                        <div className='space-y-4 px-4 pb-10'>
                            <p className='text-sm text-zinc-600 tracking-wide'>
                                The {name} features a{' '}
                                <span className='font-bold'>{caseDiameter} mm</span> case diameter.
                            </p>

                            <div className='border-t pt-4'>
                                <h3 className='font-medium mb-2'>Wrist Size (in)</h3>
                                <div className='flex gap-2'>
                                    <SizeItem
                                        size={6}
                                        onClick={() => setWristSize(6)}
                                        isSelected={wristSize === 6}
                                    />
                                    <SizeItem
                                        size={7}
                                        onClick={() => setWristSize(7)}
                                        isSelected={wristSize === 7}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className='font-medium mb-2'>Watch Size (mm)</h3>
                                <div className='flex gap-2'>
                                    <SizeItem
                                        size={25}
                                        onClick={() => setWatchSize(25)}
                                        isSelected={watchSize === 25}
                                    />
                                    <SizeItem
                                        size={34}
                                        onClick={() => setWatchSize(34)}
                                        isSelected={watchSize === 34}
                                    />
                                    <SizeItem
                                        size={38}
                                        onClick={() => setWatchSize(38)}
                                        isSelected={watchSize === 38}
                                    />
                                    <SizeItem
                                        size={40}
                                        onClick={() => setWatchSize(40)}
                                        isSelected={watchSize === 40}
                                    />
                                    <SizeItem
                                        size={42}
                                        onClick={() => setWatchSize(42)}
                                        isSelected={watchSize === 42}
                                    />
                                </div>
                            </div>

                            <div className='py-4'>
                                <Image
                                    src={Image_Size_Guide(wristSize, watchSize)}
                                    alt='Watch size guide'
                                    width={500}
                                    height={400}
                                    className='mx-auto'
                                />
                            </div>

                            <div className='border-t pt-4'>
                                <div
                                    className='flex items-center justify-between cursor-pointer'
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <h3 className='font-medium mb-2'>How To Choose Your Size</h3>
                                    <Plus className='w-4 h-4 ' />
                                </div>
                                {isOpen && (
                                    <div className='text-sm text-zinc-600 space-y-3'>
                                        <p>
                                            The size of a watch is determined by the diameter of the
                                            dial. Your choice of dial, reflective of your personal
                                            style, is a matter of individual taste.
                                        </p>
                                        <p>The diameter usually varies between 36-42mm.</p>
                                        <ul className='list-disc pl-5 space-y-1'>
                                            <li>
                                                If you prefer a smaller size, choose dials with a
                                                diameter less than 36mm.
                                            </li>
                                            <li>
                                                For a standard size, select dials that are between
                                                36-42mm.
                                            </li>
                                            <li>
                                                For a larger dial, opt for sizes greater than 42mm.
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
