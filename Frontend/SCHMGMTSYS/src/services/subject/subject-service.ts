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
    return await axiosInstance.post(CREATE_SUBJECT_URL, subj)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const getAllSubject = async (): Promise<SubjectData[]> => {
    return await axiosInstance.get(GET_SUBJECT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const getSubjectById = async (
    id: number
): Promise<SubjectData> => {
    return await axiosInstance.get(`${GET_SUBJECT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const getAllCountSubject = async (): Promise<number> => {
    return await axiosInstance.get(GET_ALL_COUNT_SUBJECT)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const updateSubject = async (
    id: number, 
    subj: Omit<SubjectData, 'id'>
): Promise<SubjectData> => {
    return await axiosInstance.put(`${UPDATE_SUBJECT_URL}${id}`, subj)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const deleteSubject = async (
    id: number
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_SUBJECT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const searchSubject = async (
    name?: string
): Promise<SubjectData[]> => {
    return await axiosInstance.get(SEARCH_SUBJECT_URL, {
        params: { name },
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error; 
    });
};