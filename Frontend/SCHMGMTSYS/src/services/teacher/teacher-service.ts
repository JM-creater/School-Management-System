import moment from "moment";
import { CREATE_TEACHER_URL, DELETE_TEACHER_URL, GET_ALL_COUNT_TEACHER, GET_TEACHER_BY_ID_URL, GET_TEACHER_URL, UPDATE_TEACHER_URL } from "../../configs/url";
import { TeacherData } from "../../screens/teacher/data/teachers";
import { axiosInstance } from "../api/axiosInstance";

export const createTeacher = async (teacher: Omit<TeacherData, 'id'>): Promise<TeacherData> => {
    const formattedValues = {
        ...teacher,
        dateOfBirth: moment(teacher.dateOfBirth).format('YYYY-MM-DD'),
        employmentDate: moment(teacher.employmentDate).format('YYYY-MM-DD')
    };
    const response = await axiosInstance.post(CREATE_TEACHER_URL, formattedValues);
    return response.data;
};

export const getAllTeacher = async (): Promise<TeacherData[]> => {
    const response = await axiosInstance.get(GET_TEACHER_URL);
    return response.data
};

export const getTeacherById = async (id: number): Promise<TeacherData> => {
    const response = await axiosInstance.get(`${GET_TEACHER_BY_ID_URL}${id}`);
    return response.data
};

export const getAllCountTeacher = async (): Promise<number> => {
    const response = await axiosInstance.get(GET_ALL_COUNT_TEACHER);
    return response.data;
};

export const updateTeacher = async (id: number, teacher: Omit<TeacherData, 'id'>): Promise<TeacherData> => {
    const formattedValues = {
        ...teacher,
        dateOfBirth: moment(teacher.dateOfBirth).format('YYYY-MM-DD'),
        employmentDate: moment(teacher.employmentDate).format('YYYY-MM-DD'),
    };
    const response = await axiosInstance.put(`${UPDATE_TEACHER_URL}${id}`, formattedValues);
    return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${DELETE_TEACHER_URL}${id}`);
};


