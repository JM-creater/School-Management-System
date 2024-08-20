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

/**
 * Fetches parent data by ID from the server.
 *
 * @param {T} id - The ID of the parent to fetch. Can be a number or undefined.
 * @return {Promise<ParentData>} - A promise that resolves to the parent data.
*/
export const getParentById = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? ParentData : ParentData> => {
    return await axiosInstance.get<T extends number ? ParentData : ParentData>(`${GET_PARENT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the total count of parents from the server.
 *
 * @return {Promise<number>} - A promise that resolves to the number of parents.
*/
export const getAllCountParent = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(GET_ALL_COUNT_PARENT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Updates a parent's information on the server.
 *
 * @param {T} id - The ID of the parent to update. Can be a number or undefined.
 * @param {Omit<ParentData, 'id'>} updatedParent - The updated parent data excluding the ID.
 * @return {Promise<ParentData>} - A promise that resolves to the updated parent data.
*/
export const updateParent = async <T extends number | undefined>(
    id: T, 
    updatedParent: Omit<ParentData, 'id'>
): Promise<T extends Omit<ParentData, 'id'> ? ParentData : ParentData> => {
   return await axiosInstance.put<T extends Omit<ParentData, 'id'> ? ParentData : ParentData>(`${UPDATE_PARENT_URL}${id}`, updatedParent)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

/**
 * Deletes a parent from the server.
 *
 * @param {T} id - The ID of the parent to delete. Can be a number or undefined.
 * @return {Promise<ParentData>} - A promise that resolves to the deleted parent data.
*/
export const deleteParent = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? ParentData : ParentData> => {
    return await axiosInstance.delete<T extends number ? ParentData : ParentData>(`${DELETE_PARENT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Searches for parents by name from the server.
 *
 * @param {T} name - The name or partial name of the parent to search. Can be a string or undefined.
 * @return {Promise<ParentData[]>} - A promise that resolves to an array of parent data.
*/
export const searchParent = async <T extends string | undefined>(
    name?: T
): Promise<T extends string ? ParentData[] : ParentData[]> => {
    return await axiosInstance.get<T extends string ? ParentData[] : ParentData[]>(SEARCH_PARENT_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
