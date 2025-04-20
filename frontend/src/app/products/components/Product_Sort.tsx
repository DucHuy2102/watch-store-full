'use client';

import { IProductSortFilter } from '@/lib/redux/interfaces/product.interface';
import { useState, useRef, useEffect } from 'react';
import { IoChevronDown, IoClose } from 'react-icons/io5';

const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'new', label: 'Date: New to old' },
    { value: 'rating', label: 'Rate: High to Low' },
];

type OptionsProps = {
    handleSelect: (value: string, label: string) => void;
};

const Options = ({ handleSelect }: OptionsProps) => {
    return (
        <div
            className='absolute z-50 w-[180px] mt-2 py-1 bg-white dark:bg-zinc-950 
              border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg max-h-[200px] overflow-y-auto'
        >
            <div className='px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400'>
                Sort Options
            </div>
            {sortOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleSelect(option.value, option.label)}
                    className='w-full px-2 py-1.5 text-left text-sm text-zinc-800 dark:text-zinc-200
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default function Product_Sort({
    sort,
    onSortChange,
}: Pick<IProductSortFilter, 'sort' | 'onSortChange'>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // close the dropdown when clicking outside of the dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // set the selected option when the sort prop changes
    useEffect(() => {
        if (!sort) {
            setSelectedOption('');
            return;
        }
        const option = sortOptions.find((opt) => opt.value === sort);
        if (option) {
            setSelectedOption(option.label);
        }
    }, [sort]);

    // handle the selection of an option
    const handleSelect = (value: string, label: string) => {
        setSelectedOption(label);
        if (onSortChange) {
            onSortChange(value);
        }
        setTimeout(() => setIsOpen(false), 0);
    };

    // clear the selected option
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedOption('');
        if (onSortChange) {
            onSortChange('');
        }
    };

    return (
        <div className='relative' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-[180px] px-3 py-2 text-sm border rounded-md bg-white dark:bg-zinc-950 
                flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900'
            >
                <span className='text-sm font-medium text-zinc-800 dark:text-zinc-200'>
                    {selectedOption || 'Sort by'}
                </span>
                {selectedOption ? (
                    <div
                        className='p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer
                        flex items-center justify-center'
                        onClick={handleClear}
                    >
                        <IoClose className='w-3 h-3' />
                    </div>
                ) : (
                    <IoChevronDown
                        className={`transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                )}
            </button>

            {isOpen && <Options handleSelect={handleSelect} />}
        </div>
    );
}
