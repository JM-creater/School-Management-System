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
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'), 
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD')
    };
    return await axiosInstance.post(CREATE_TEACHER_URL, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const getAllTeacher = async (): Promise<TeacherData[]> => {
    return await axiosInstance.get(GET_TEACHER_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getTeacherById = async (
    id: number
): Promise<TeacherData> => {
    return await axiosInstance.get(`${GET_TEACHER_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const getAllCountTeacher = async (): Promise<number> => {
    return await axiosInstance.get(GET_ALL_COUNT_TEACHER)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export const searchTeacher = async (
    firstName?: string
): Promise<TeacherData[]> => {
    return await axiosInstance.get(SEARCH_TEACHER_URL, {
        params: { firstName }
    }).then((response) => response.data)
    .catch((error) => {
        throw error
    });
};

export const updateTeacher = async (
    id: number, 
    teacher: Omit<TeacherData, 'id'>
): Promise<TeacherData> => {
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'), 
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD')
    };
    return await axiosInstance.put(`${UPDATE_TEACHER_URL}${id}`, formattedValues)
    .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const deleteTeacher = async (
    id: number
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_TEACHER_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};