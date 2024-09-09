import axios, { 
    AxiosError, 
    AxiosInstance, 
    AxiosResponse 
} from 'axios';
import { ACCESS_TOKEN } from '../../configs/constants';

export const axiosInstance = (
    token: string 
    | null = null
): AxiosInstance => {
    const headers = token
      ? {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
      : {
            "Content-Type": "application/json",
        };
  
    const client = axios.create({
        baseURL: 'http://localhost:8080',
        headers,
        timeout: 60000,
        withCredentials: false,
    });
  
    client.interceptors.request.use((config) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  
    client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        try {
          const { response } = error;
          if (response?.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
          }
        } catch (e) {
          console.error(e);
        }
        throw error;
      }
    );
  
    return client;
};

