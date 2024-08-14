import { CREATE_SUBJECT_URL, DELETE_SUBJECT_URL, GET_SUBJECT_BY_ID_URL, GET_SUBJECT_URL, UPDATE_SUBJECT_URL } from "../../configs/url";
import { SubjectData } from "../../screens/curriculum/subject/data/subject";
import { axiosInstance } from "../api/axiosInstance";

export const createSubject = async (subj: Omit<SubjectData, 'id'>): Promise<SubjectData> => {
    const response = await axiosInstance.post(CREATE_SUBJECT_URL, subj);
    return response.data;
};

export const getAllSubject = async (): Promise<SubjectData[]> => {
    const response = await axiosInstance.get(GET_SUBJECT_URL);
    return response.data;
};

export const getSubjectById = async (id: number): Promise<SubjectData> => {
    const response = await axiosInstance.get(`${GET_SUBJECT_BY_ID_URL}${id}`);
    return response.data
};

export const updateSubject = async (id: number, subj: Omit<SubjectData, 'id'>): Promise<SubjectData> => {
    const response = await axiosInstance.put(`${UPDATE_SUBJECT_URL}${id}`, subj);
    return response.data;
};

export const deleteSubject = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${DELETE_SUBJECT_URL}${id}`);
};