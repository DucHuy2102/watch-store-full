import axiosClient from '@/utils/axiosClient';

export const getAllProducts = async (query: string = '') => {
    const res = await axiosClient.get(`/products?${query}`);
    return res.data;
};

export const getProductById = async (id: string) => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
};

export const getRelatedProducts = async (watchStyle: string) => {
    const res = await axiosClient.get(`/products/products-related?watchStyle=${watchStyle}`);
    return res.data;
};

export const getSearchSuggestions = async (query: string) => {
    const res = await axiosClient.get(`/products/search/suggestions?query=${query}`);
    return res.data;
};
