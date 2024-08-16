import { CREATE_CLASS_URL, DELETE_CLASS_URL, GET_ALL_COUNT_CLASS, GET_CLASS_BY_ID_URL, GET_CLASS_URL, SEARCH_CLASS_URL, UPDATE_CLASS_URL } from "../../configs/url";
import { ClassData } from "../../screens/curriculum/class/data/class";
import { axiosInstance } from "../api/axiosInstance";

export const createClass = async (
    classes: Omit<ClassData, 'id'>
): Promise<ClassData> => {
    return await axiosInstance.post(CREATE_CLASS_URL, classes)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllClass = async (): Promise<ClassData[]> => {
    return await axiosInstance.get(GET_CLASS_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getClassById = async (
    id: number
): Promise<ClassData> => {
    return await axiosInstance.get(`${GET_CLASS_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllCountClass = async (): Promise<number> => {
    return await axiosInstance.get(GET_ALL_COUNT_CLASS)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateClass = async (
    id: number, 
    classes: Omit<ClassData, 'id'>
): Promise<ClassData> => {
    return await axiosInstance.put(`${UPDATE_CLASS_URL}${id}`, classes)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const deleteClass = async (
    id: number
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_CLASS_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const searchClass = async (
    name?: string
): Promise<ClassData[]> => {
    return await axiosInstance.get(SEARCH_CLASS_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};