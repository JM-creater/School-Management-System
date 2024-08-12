import { CREATE_PARENT_URL, GET_PARENT_URL } from "../../configs/url";
import { ParentData } from "../../screens/parents/data/parents";
import { axiosInstance } from "../api/axiosInstance";

export const createParent = async (parent: Omit<ParentData, 'id'>): Promise<ParentData> => {
    const response = await axiosInstance.post(CREATE_PARENT_URL, parent, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

export const getAllParent = async (): Promise<ParentData[]> => {
    const response = await axiosInstance.get(GET_PARENT_URL);
    return response.data;
};

// export const updateParent = async (parent: ParentData): Promise<ParentData> => {
//     const response = await axiosInstance.put()
// }

