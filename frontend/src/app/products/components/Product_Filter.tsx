'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { IProductFilterState, IProductSortFilter } from '@/lib/redux/interfaces/product.interface';
import {
    Data_CaseDiameter,
    Data_CrystalLens,
    Data_Features,
    Data_MovementType,
    Data_StockStatus,
    Data_StrapLugWidth,
    Data_StrapMaterials,
    Data_waterResistance,
} from '@/app/products/components/Data_Filter';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const FILTER_CONFIGS = [
    { key: 'stockStatus', title: 'Stock Status', options: Data_StockStatus },
    { key: 'movementType', title: 'Watch Movement', options: Data_MovementType },
    { key: 'caseDiameter', title: 'Case Diameter', options: Data_CaseDiameter },
    { key: 'features', title: 'Features', options: Data_Features },
    { key: 'strapMaterial', title: 'Band Material', options: Data_StrapMaterials },
    { key: 'waterResistance', title: 'Water Resistance', options: Data_waterResistance },
    { key: 'crystalLens', title: 'Crystal (Lens) Material', options: Data_CrystalLens },
    { key: 'strapLugWidth', title: 'Strap Width', options: Data_StrapLugWidth },
] as const;

interface FilterProps {
    key: string;
    label: string;
}

interface FilterGroupProps {
    title: string;
    options: FilterProps[];
    selected: string[];
    toggle: (key: string) => void;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

const FilterGroup = ({
    title,
    options,
    selected,
    toggle,
    isExpanded,
    onToggleExpand,
}: FilterGroupProps) => (
    <div className='space-y-4 py-3'>
        <div
            className='flex items-center justify-between cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300'
            onClick={onToggleExpand}
        >
            <h3 className='text-sm font-medium'>{title}</h3>
            {isExpanded ? (
                <MdExpandLess className='w-5 h-5' />
            ) : (
                <MdExpandMore className='w-5 h-5' />
            )}
        </div>
        {isExpanded && (
            <div className='grid grid-cols-2 gap-2'>
                {options.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => toggle(key)}
                        className={`py-3 text-sm rounded-sm border transition-colors cursor-pointer
                        ${
                            selected.includes(key)
                                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        )}
    </div>
);

export default function Product_Filter({
    filters,
    onFilterChange,
}: Pick<IProductSortFilter, 'filters' | 'onFilterChange'>) {
    const [filterState, setFilterState] = useState<IProductFilterState>({
        stockStatus: [],
        movementType: [],
        caseDiameter: [],
        strapLugWidth: [],
        features: [],
        strapMaterial: [],
        waterResistance: [],
        crystalLens: [],
    });
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    useEffect(() => {
        const newFilterState = { ...filterState };
        Object.entries(filters).forEach(([key, value]) => {
            if (value && key in newFilterState) {
                (newFilterState as IProductFilterState)[key as keyof IProductFilterState] =
                    value.split(',');
            } else {
                (newFilterState as IProductFilterState)[key as keyof IProductFilterState] = [];
            }
        });
        setFilterState(newFilterState);
    }, [filters]);

    const toggleSection = (sectionKey: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionKey)
                ? prev.filter((key) => key !== sectionKey)
                : [...prev, sectionKey]
        );
    };

    const toggleFilterArray = (key: keyof typeof filterState, value: string) => {
        setFilterState((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((item: string) => item !== value)
                : [...prev[key], value],
        }));
    };

    const clearFilters = () => {
        setFilterState({
            stockStatus: [],
            movementType: [],
            caseDiameter: [],
            strapLugWidth: [],
            features: [],
            strapMaterial: [],
            waterResistance: [],
            crystalLens: [],
        });
    };

    const applyFilters = () => {
        if (onFilterChange) {
            const filterRecord: Record<string, string[]> = {
                stockStatus: filterState.stockStatus,
                movementType: filterState.movementType,
                caseDiameter: filterState.caseDiameter,
                strapLugWidth: filterState.strapLugWidth,
                features: filterState.features,
                strapMaterial: filterState.strapMaterial,
                waterResistance: filterState.waterResistance,
                crystalLens: filterState.crystalLens,
            };
            onFilterChange(filterRecord);
        }
    };

    const totalFilters = Object.values(filterState).reduce(
        (acc, filterArray) => acc + filterArray.length,
        0
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2'>
                    <FiFilter className='w-4 h-4' />
                    Filter {totalFilters > 0 && `(${totalFilters})`}
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full sm:max-w-md'>
                <SheetHeader className='border-b'>
                    <SheetTitle className='text-lg font-semibold'>Advanced Filters</SheetTitle>
                    <SheetDescription className='text-sm italic'>
                        Refine your search with detailed filters to find the perfect timepiece that
                        suits your style and lifestyle.
                    </SheetDescription>
                </SheetHeader>

                <div className='space-y-6 px-6 overflow-y-auto'>
                    {FILTER_CONFIGS.map(({ key, title, options }) => (
                        <FilterGroup
                            key={key}
                            title={title}
                            options={options}
                            selected={filterState[key]}
                            toggle={(val: string) => toggleFilterArray(key, val)}
                            isExpanded={expandedSections.includes(key)}
                            onToggleExpand={() => toggleSection(key)}
                        />
                    ))}
                </div>

                <div className='mt-auto p-6 space-y-4 bg-white dark:bg-zinc-950 border-t'>
                    {totalFilters > 0 && (
                        <div>
                            <h4 className='text-sm font-medium mb-2'>Selected Filters:</h4>
                            <div className='flex flex-wrap gap-2'>
                                {FILTER_CONFIGS.map(({ key, title, options }) =>
                                    filterState[key].map((value) => {
                                        const option = options.find((opt) => opt.key === value);
                                        return (
                                            option && (
                                                <div
                                                    key={`${key}-${value}`}
                                                    className='flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs'
                                                >
                                                    <span className='font-medium'>{title}:</span>
                                                    <span className='mr-1'>{option.label}</span>
                                                    <button
                                                        onClick={() =>
                                                            toggleFilterArray(key, value)
                                                        }
                                                        className='hover:bg-red-500 hover:text-white dark:hover:text-zinc-100 
                                                        w-4 h-4 flex items-center justify-center pb-1 text-xs rounded-full cursor-pointer'
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            )
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                    <div className='flex items-center justify-between gap-4'>
                        <Button
                            variant='outline'
                            onClick={clearFilters}
                            className='flex-1 cursor-pointer'
                        >
                            Clear All
                        </Button>
                        <Button onClick={applyFilters} className='flex-1 cursor-pointer'>
                            Apply Filters ({totalFilters})
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
