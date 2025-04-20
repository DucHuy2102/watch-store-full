export interface IProductVariant {
    _id: string;
    color: string;
    sellPrice: number;
    originPrice: number;
    stock: number;
    sold: number;
    rating: number;
    images: string[];
}

export interface IBrand {
    _id: string;
    name: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    brandId: IBrand;
    variants: IProductVariant[];
    defaultVariantId: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
    totalSold: number;
    isSale: boolean;
    isNew: boolean;
    isBestSeller: boolean;
    isLimitedEdition: boolean;
}

export interface IProductSortFilter {
    sort?: string;
    onSortChange?: (value: string) => void;
    filters: Record<string, string>;
    onFilterChange: (filterState: Record<string, string[]>) => void;
}

export interface IProductFilterState {
    stockStatus: string[];
    movementType: string[];
    caseDiameter: string[];
    strapLugWidth: string[];
    features: string[];
    strapMaterial: string[];
    waterResistance: string[];
    crystalLens: string[];
}
