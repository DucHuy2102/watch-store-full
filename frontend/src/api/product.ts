import axiosClient from '@/utils/axiosClient';

export const getAllProducts = async (query: string = '') => {
    const res = await axiosClient.get(`/products?${query}`);
    return res.data;
};

export const getProductById = async (id: string) => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
};
