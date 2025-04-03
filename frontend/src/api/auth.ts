import axiosClient from '@/utils/axiosClient';

export const signIn = async (username: string, password: string) => {
    const res = await axiosClient.post('/auth/sign-in', {
        username,
        password,
    });

    return res.data;
};

export const signUp = async () => {};

export const signOut = async () => {};
