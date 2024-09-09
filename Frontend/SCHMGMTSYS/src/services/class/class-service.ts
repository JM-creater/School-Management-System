import { AxiosError, AxiosResponse } from "axios";
import { 
    CREATE_CLASS_URL, 
    DELETE_CLASS_URL, 
    GET_ALL_COUNT_CLASS, 
    GET_CLASS_BY_ID_URL,
    GET_CLASS_URL, 
    SEARCH_CLASS_URL, 
    UPDATE_CLASS_URL
} from "../../configs/url";
import { ClassData } from "../../screens/curriculum/class/data/class";
import { axiosInstance } from "../api/axiosInstance";

export const createClass = async (
    classes: Omit<ClassData, 'id'>
): Promise<ClassData> => {
    const client = axiosInstance(); 
    return await client.post<ClassData>(CREATE_CLASS_URL, classes)
        .then((response: AxiosResponse<ClassData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllClass = async (): Promise<ClassData[]> => {
    const client = axiosInstance();
    return await client.get<ClassData[]>(GET_CLASS_URL)
        .then((response: AxiosResponse<ClassData[]>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getClassById = async (
    id: number
): Promise<ClassData> => {
    const client = axiosInstance(); 
    return await client.get<ClassData>(`${GET_CLASS_BY_ID_URL}${id}`)
        .then((response: AxiosResponse<ClassData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllCountClass = async (): Promise<number> => {
    const client = axiosInstance(); 
    return await client.get<number>(GET_ALL_COUNT_CLASS)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const updateClass = async (
    id: number, 
    classes: Omit<ClassData, 'id'>
): Promise<ClassData> => {
    const client = axiosInstance(); 
    return await client.put<ClassData>(`${UPDATE_CLASS_URL}${id}`, classes)
        .then((response: AxiosResponse<ClassData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const deleteClass = async (
    id: number
): Promise<void> => {
    const client = axiosInstance();  
    return await client.delete<void>(`${DELETE_CLASS_URL}${id}`)
        .then((response: AxiosResponse<void>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const searchClass = async (
    name?: string
): Promise<ClassData[]> => {
    const client = axiosInstance();  
    return await client.get<ClassData[]>(SEARCH_CLASS_URL, {
        params: { name },
    }).then((response: AxiosResponse<ClassData[]>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};
