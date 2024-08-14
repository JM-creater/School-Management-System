import { CREATE_CLASS_URL, DELETE_CLASS_URL, GET_ALL_COUNT_CLASS, GET_CLASS_BY_ID_URL, GET_CLASS_URL, UPDATE_CLASS_URL } from "../../configs/url";
import { ClassData } from "../../screens/curriculum/class/data/class";
import { axiosInstance } from "../api/axiosInstance";

export const createClass = async (classes: Omit<ClassData, 'id'>): Promise<ClassData> => {
    const response = await axiosInstance.post(CREATE_CLASS_URL, classes);
    return response.data;
};

export const getAllClass = async (): Promise<ClassData[]> => {
    const response = await axiosInstance.get(GET_CLASS_URL);
    return response.data;
};

export const getClassById = async (id: number): Promise<ClassData> => {
    const response = await axiosInstance.get(`${GET_CLASS_BY_ID_URL}${id}`);
    return response.data
};

export const getAllCountClass = async (): Promise<number> => {
    const response = await axiosInstance.get(GET_ALL_COUNT_CLASS);
    return response.data;
};

export const updateClass = async(id: number, classes: Omit<ClassData, 'id'>): Promise<ClassData> => {
    const response = await axiosInstance.put(`${UPDATE_CLASS_URL}${id}`, classes);
    return response.data;
};

export const deleteClass = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${DELETE_CLASS_URL}${id}`)
};

