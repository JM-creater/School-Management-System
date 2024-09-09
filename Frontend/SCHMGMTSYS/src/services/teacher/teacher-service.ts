import { AxiosError, AxiosResponse } from "axios";
import { 
    CREATE_TEACHER_URL, 
    DELETE_TEACHER_URL, 
    GET_ALL_COUNT_TEACHER, 
    GET_TEACHER_BY_ID_URL, 
    GET_TEACHER_URL, 
    SEARCH_TEACHER_URL, 
    UPDATE_TEACHER_URL 
} from "../../configs/url";
import { TeacherData } from "../../screens/teacher/data/teachers";
import { axiosInstance } from "../api/axiosInstance";

export const createTeacher = async (
    teacher: Omit<TeacherData, 'id'>
): Promise<TeacherData> => {
    const client = axiosInstance();  
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'),
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD'),
    };
    return await client.post<TeacherData>(CREATE_TEACHER_URL, formattedValues)
        .then((response: AxiosResponse<TeacherData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllTeacher = async (): Promise<TeacherData[]> => {
    const client = axiosInstance();  
    return await client.get<TeacherData[]>(GET_TEACHER_URL)
        .then((response: AxiosResponse<TeacherData[]>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getTeacherById = async (
    id: number
): Promise<TeacherData> => {
    const client = axiosInstance(); 
    return await client.get<TeacherData>(`${GET_TEACHER_BY_ID_URL}${id}`)
        .then((response: AxiosResponse<TeacherData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const getAllCountTeacher = async (): Promise<number> => {
    const client = axiosInstance();  
    return await client.get<number>(GET_ALL_COUNT_TEACHER)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const updateTeacher = async (
    id: number, 
    teacher: Omit<TeacherData, 'id'>
): Promise<TeacherData> => {
    const client = axiosInstance(); 
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'),
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD'),
    };
    return await client.put<TeacherData>(`${UPDATE_TEACHER_URL}${id}`, formattedValues)
        .then((response: AxiosResponse<TeacherData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const deleteTeacher = async (
    id: number
): Promise<void> => {
    const client = axiosInstance();  
    return await client.delete<void>(`${DELETE_TEACHER_URL}${id}`)
        .then((response: AxiosResponse<void>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

export const searchTeacher = async (
    firstName?: string
): Promise<TeacherData[]> => {
    const client = axiosInstance();  
    return await client.get<TeacherData[]>(SEARCH_TEACHER_URL, {
        params: { firstName },
    }).then((response: AxiosResponse<TeacherData[]>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};
