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

export const createClass = async <T extends  Omit<ClassData, 'id'>>(
    classes: T
): Promise<T extends Omit<ClassData, 'id'> ? ClassData : ClassData> => {
    return await axiosInstance.post<T extends Omit<ClassData, 'id'> ? ClassData : ClassData>(CREATE_CLASS_URL, classes)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllClass = async <T extends string | undefined>(): Promise<
    T extends string ? ClassData[] : ClassData[]
> => {
    return await axiosInstance.get<T extends string ? ClassData[] : ClassData[]>(GET_CLASS_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};


export const getClassById = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? ClassData : ClassData> => {
    return await axiosInstance.get<T extends number ? ClassData : ClassData>(`${GET_CLASS_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllCountClass = async <T>(): Promise<T> => {
    return await axiosInstance.get<T>(GET_ALL_COUNT_CLASS)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateClass = async <T extends number | undefined>(
    id: T, 
    classes: Omit<ClassData, 'id'>
): Promise<T extends number ? ClassData : ClassData> => {
    return await axiosInstance.put<T extends number ? ClassData : ClassData>(`${UPDATE_CLASS_URL}${id}`, classes)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const deleteClass = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? ClassData : ClassData> => {
    return await axiosInstance.delete<T extends number ? ClassData : ClassData>(`${DELETE_CLASS_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};
    
export const searchClass = async <T extends string | undefined>(
    name?: T
): Promise<T extends string ? ClassData[] : ClassData[]> => {
    return await axiosInstance.get<T extends string ? ClassData[] : ClassData[]>(SEARCH_CLASS_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};