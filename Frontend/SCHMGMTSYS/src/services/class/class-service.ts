import { CREATE_CLASS_URL, GET_CLASS_URL } from "../../configs/url";
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