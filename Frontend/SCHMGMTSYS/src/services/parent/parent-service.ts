import { 
    CREATE_PARENT_URL, 
    DELETE_PARENT_URL, 
    GET_ALL_COUNT_PARENT, 
    GET_PARENT_BY_ID_URL, 
    GET_PARENT_URL, 
    SEARCH_PARENT_URL, 
    UPDATE_PARENT_URL 
} from "../../configs/url";
import { Identifiable, ParentData } from "../../screens/parents/data/parents";
import { axiosInstance } from "../api/axiosInstance";

export const createParent = async <
    T extends Omit<ParentData, 'id'>
>(
    parent: T
): Promise<T extends Omit<ParentData, 'id'> ? ParentData : ParentData> => {
    return await axiosInstance.post(CREATE_PARENT_URL, parent)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllParent = async <
    TParentData extends ParentData[]
>(): Promise<TParentData> => {
    return await axiosInstance.get(GET_PARENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getParentById = async <T extends number>(
    id: T
): Promise<ParentData> => {
    return await axiosInstance.get(`${GET_PARENT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllCountParent = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get(GET_ALL_COUNT_PARENT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateParent = async <
    T extends number, 
    TUpdate extends Omit<ParentData, 'id'>
>(
    id: T, 
    updatedParent: TUpdate
): Promise<ParentData> => {
   return await axiosInstance.put(`${UPDATE_PARENT_URL}${id}`, updatedParent)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const deleteParent = async <T = number>(
    id: Identifiable<T>
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_PARENT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const searchParent = async <T extends string | undefined>(
    name?: T
): Promise<T extends string ? ParentData[] : ParentData[]> => {
    return await axiosInstance.get(SEARCH_PARENT_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
