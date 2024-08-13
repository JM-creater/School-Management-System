import { CREATE_PARENT_URL, DELETE_PARENT_URL, GET_PARENT_BY_ID_URL, GET_PARENT_URL, UPDATE_PARENT_URL } from "../../configs/url";
import { ParentData } from "../../screens/parents/data/parents";
import { axiosInstance } from "../api/axiosInstance";

export const createParent = async (parent: Omit<ParentData, 'id'>): Promise<ParentData> => {
    const response = await axiosInstance.post(CREATE_PARENT_URL, parent);
    return response.data;
};

export const getAllParent = async (): Promise<ParentData[]> => {
    const response = await axiosInstance.get(GET_PARENT_URL);
    return response.data;
};

export const getParentById = async (id: number): Promise<ParentData> => {
    const response = await axiosInstance.get(`${GET_PARENT_BY_ID_URL}${id}`);
    return response.data;
};

export const updateParent = async (id: number, updatedParent: Omit<ParentData, 'id'>): Promise<ParentData> => {
    const response = await axiosInstance.put(`${UPDATE_PARENT_URL}${id}`, updatedParent);
    return response.data;
};

export const deleteParent = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${DELETE_PARENT_URL}${id}`)
};

