import axiosClient from '@/utils/axiosClient';

export type UserType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const signIn = async (data: Omit<UserType, 'email' | 'confirmPassword'>) => {
    const res = await axiosClient.post('/auth/sign-in', data);
    return res.data;
};

export const signOut = async () => {
    const res = await axiosClient.post('/auth/sign-out');
    return res.data;
};

export const signUp = async (data: Omit<UserType, 'confirmPassword'>) => {
    const res = await axiosClient.post('/auth/sign-up', data);
    return res.data;
};

export const verifyEmail = async (code: string) => {
    const res = await axiosClient.post('/auth/verify-email', { code });
    return res.data;
};

export const forgotPassword = async (email: string) => {
    const res = await axiosClient.post('/auth/forgot-password', { email });
    return res.data;
};

export const resetPassword = async (data: {
    code: string;
    password: string;
    confirmPassword: string;
}) => {
    const res = await axiosClient.post('/auth/reset-password', data);
    return res.data;
};
