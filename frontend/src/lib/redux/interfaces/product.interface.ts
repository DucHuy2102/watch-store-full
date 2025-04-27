export interface IProductVariant {
    _id: string;
    color: string;
    sellPrice: number;
    originPrice: number;
    stock: number;
    totalSold: number;
    rating: number;
    images: string[];
}

export interface ISpecifications {
    _id: string;
    movementType: string;
    waterResistance: string;
    crystalLens: string;
    caseDiameter: number;
    caseHeight: number;
    caseMaterial: string;
    caseColor: string;
    caseFinish: string;
    dialColor: string;
    dialMarkings: string;
    strapLugWidth: number;
    strapMaterial: string;
    strapBuckle: string;
    batteryType: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    watchStyle: string;
    gender: string;
    specifications: ISpecifications;
    variant: IProductVariant;
    isSale: boolean;
    isNewArrival: boolean;
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
