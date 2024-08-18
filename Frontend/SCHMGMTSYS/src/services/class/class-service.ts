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

/**
 * Creates a new class by sending a POST request to the class creation URL.
 *
 * @param {Omit<ClassData, 'id'>} classes - The class data to be created.
 * @return {Promise<ClassData | ClassData[]>} The created class data or an array of created class data.
 * @throws {Error} If there is an error during the request.
*/
export const createClass = async <T extends  Omit<ClassData, 'id'>>(
    classes: T
): Promise<T extends Omit<ClassData, 'id'> ? ClassData : ClassData> => {
    return await axiosInstance.post<T extends Omit<ClassData, 'id'> ? ClassData : ClassData>(CREATE_CLASS_URL, classes)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves all classes from the server.
 *
 * @return {Promise<ClassData[] | ClassData[]>} An array of class data or a single class data object
*/
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

/**
 * Retrieves the total count of classes from the server.
 *
 * @return {Promise<number>} The total count of classes
*/
export const getAllCountClass = async <T>(): Promise<T> => {
    return await axiosInstance.get<T>(GET_ALL_COUNT_CLASS)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Updates a class by sending a PUT request to the class update URL.
 *
 * @param {T extends number | undefined} id - The ID of the class to be updated.
 * @param {Omit<ClassData, 'id'>} classes - The updated class data.
 * @return {Promise<T extends number ? ClassData : ClassData>} The updated class data.
*/
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

/**
 * Deletes a class by sending a DELETE request to the class deletion URL.
 *
 * @param {T extends number | undefined} id - The ID of the class to be deleted.
 * @return {Promise<T extends number ? ClassData : ClassData>} The deleted class data or an error response.
*/
export const deleteClass = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? ClassData : ClassData> => {
    return await axiosInstance.delete<T extends number ? ClassData : ClassData>(`${DELETE_CLASS_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};
    
/**
 * Searches for a class by its name.
 *
 * @param {string | undefined} name - The name of the class to search for.
 * @return {Promise<ClassData[] | ClassData[]>} A promise that resolves to an array of class data if a name is provided, otherwise a single class data.
*/
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