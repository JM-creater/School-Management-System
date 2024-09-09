import { AxiosError, AxiosResponse } from "axios";
import { 
    CREATE_SUBJECT_URL, 
    DELETE_SUBJECT_URL, 
    GET_ALL_COUNT_SUBJECT, 
    GET_SUBJECT_BY_ID_URL, 
    GET_SUBJECT_URL, 
    SEARCH_SUBJECT_URL, 
    UPDATE_SUBJECT_URL 
} from "../../configs/url";
import { SubjectData } from "../../screens/curriculum/subject/data/subject";
import { axiosInstance } from "../api/axiosInstance";

export const createSubject = async (
    subj: Omit<SubjectData, 'id'>
): Promise<SubjectData> => {
    const client = axiosInstance(); 
    return await client.post<SubjectData>(CREATE_SUBJECT_URL, subj)
        .then((response: AxiosResponse<SubjectData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllSubject = async (): Promise<SubjectData[]> => {
    const client = axiosInstance(); 
    return await client.get<SubjectData[]>(GET_SUBJECT_URL)
        .then((response: AxiosResponse<SubjectData[]>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getSubjectById = async (
    id: number
): Promise<SubjectData> => {
    const client = axiosInstance();  
    return await client.get<SubjectData>(`${GET_SUBJECT_BY_ID_URL}${id}`)
        .then((response: AxiosResponse<SubjectData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllCountSubject = async (): Promise<number> => {
    const client = axiosInstance(); 
    return await client.get<number>(GET_ALL_COUNT_SUBJECT)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const updateSubject = async (
    id: number, 
    subj: Omit<SubjectData, 'id'>
): Promise<SubjectData> => {
    const client = axiosInstance(); 
    return await client.put<SubjectData>(`${UPDATE_SUBJECT_URL}${id}`, subj)
        .then((response: AxiosResponse<SubjectData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const deleteSubject = async (
    id: number
): Promise<SubjectData> => {
    const client = axiosInstance(); 
    return await client.delete<SubjectData>(`${DELETE_SUBJECT_URL}${id}`)
        .then((response: AxiosResponse<SubjectData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const searchSubject = async (
    name?: string
): Promise<SubjectData[]> => {
    const client = axiosInstance();  
    return await client.get<SubjectData[]>(SEARCH_SUBJECT_URL, {
        params: { name },
    }).then((response: AxiosResponse<SubjectData[]>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};
