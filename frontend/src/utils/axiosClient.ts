import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (res) => res,
    (err) => {
        console.error('API Error:', err.response?.data || err.message);
        return Promise.reject(err);
    }
);

export default axiosClient;
