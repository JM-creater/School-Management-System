import { 
    AxiosError, 
    AxiosResponse 
} from "axios";
import { 
    CREATE_PARENT_URL, 
    DELETE_PARENT_URL, 
    GET_ALL_COUNT_PARENT, 
    GET_PARENT_BY_ID_URL, 
    GET_PARENT_URL, 
    SEARCH_PARENT_URL, 
    UPDATE_PARENT_URL 
} from "../../configs/url";
import { axiosInstance } from "../api/axiosInstance";
import { ParentData } from "../../configs/interface";

export const createParent = async <
    TParentData extends Omit<ParentData, 'id'>
>(
    parent: TParentData
): Promise<ParentData> => {
    const client = axiosInstance();
    return await client.post<ParentData>(CREATE_PARENT_URL, parent)
        .then((response: AxiosResponse<ParentData>) => response.data) 
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllParent = async <
    TParentData extends ParentData[]
>(): Promise<TParentData> => {
    const client = axiosInstance();
    return await client.get(GET_PARENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getParentById = async <TNumber extends number>(
    id: TNumber
): Promise<ParentData> => {
    const client = axiosInstance(); 
    return await client.get<ParentData>(`${GET_PARENT_BY_ID_URL}${id}`)
        .then((response: AxiosResponse<ParentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllCountParent = async (): Promise<number> => {
    const client = axiosInstance();
    return await client.get<number>(GET_ALL_COUNT_PARENT)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const updateParent = async <
    TNumber extends number, 
    TUpdate extends Omit<ParentData, 'id'>
>(
    id: TNumber, 
    updatedParent: TUpdate
): Promise<ParentData> => {
    const client = axiosInstance(); 
    return await client.put<ParentData>(`${UPDATE_PARENT_URL}${id}`, updatedParent)
        .then((response: AxiosResponse<ParentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const deleteParent = async <TNumber extends number>(
    id: TNumber
): Promise<TNumber> => {
    const client = axiosInstance();
    return await client.delete<TNumber>(`${DELETE_PARENT_URL}${id}`)
        .then((response: AxiosResponse<TNumber>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const searchParent = async <TString extends string>(
    name?: TString
): Promise<ParentData[]> => {
    const client = axiosInstance();
    return await client.get<ParentData[]>(SEARCH_PARENT_URL, {
        params: { name },
    }).then((response: AxiosResponse<ParentData[]>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

