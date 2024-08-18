import { 
    CREATE_PARENT_URL, 
    DELETE_PARENT_URL, 
    GET_ALL_COUNT_PARENT, 
    GET_PARENT_BY_ID_URL, 
    GET_PARENT_URL, 
    SEARCH_PARENT_URL, 
    UPDATE_PARENT_URL 
} from "../../configs/url";
import { ParentData } from "../../screens/parents/data/parents";
import { axiosInstance } from "../api/axiosInstance";

export const createParent = async (
    parent: Omit<ParentData, 'id'>
): Promise<ParentData> => {
    return await axiosInstance.post(CREATE_PARENT_URL, parent)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllParent = async (): Promise<ParentData[]> => {
    return await axiosInstance.get(GET_PARENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getParentById = async (
    id: number
): Promise<ParentData> => {
    return await axiosInstance.get(`${GET_PARENT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllCountParent = async (): Promise<number> => {
    return await axiosInstance.get(GET_ALL_COUNT_PARENT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateParent = async (
    id: number, 
    updatedParent: Omit<ParentData, 'id'>
): Promise<ParentData> => {
   return await axiosInstance.put(`${UPDATE_PARENT_URL}${id}`, updatedParent)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const deleteParent = async (
    id: number
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_PARENT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const searchParent = async (
    name?: string
): Promise<ParentData[]> => {
    return await axiosInstance.get(SEARCH_PARENT_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
