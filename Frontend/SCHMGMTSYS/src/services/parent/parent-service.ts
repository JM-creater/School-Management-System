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

/**
 * Creates a new parent by sending a POST request to the parent creation URL.
 *
 * @param {Omit<ParentData, 'id'>} parent - The parent data to be created.
 * @return {Promise<ParentData>} The created parent data.
 */
export const createParent = async <T extends Omit<ParentData, 'id'>>(
    parent: T
): Promise<T extends Omit<ParentData, 'id'> ? ParentData : ParentData> => {
    return await axiosInstance.post<T extends Omit<ParentData, 'id'> ? ParentData : ParentData>(CREATE_PARENT_URL, parent)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves all parent data from the server.
 *
 * @return {Promise<ParentData[] | ParentData[]>} An array of parent data or a single parent data object
*/
export const getAllParent = async <T extends string | undefined>(): Promise<
    T extends string ? ParentData[] : ParentData[]
> => {
    return await axiosInstance.get<T extends string ? ParentData[] : ParentData[]>(GET_PARENT_URL)
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
