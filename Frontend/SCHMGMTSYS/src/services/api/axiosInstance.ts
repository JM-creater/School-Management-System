import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

// process.env.VITE_SCHMGT_API_URL as string
