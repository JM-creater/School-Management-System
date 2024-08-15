import moment from "moment";
import { StudentData } from "../../screens/student/data/student";
import { axiosInstance } from "../api/axiosInstance";
import { COUNT_ABSENT_URL, COUNT_LATE_URL, COUNT_PRESENT_URL, CREATE_STUDENT_URL, DELETE_STUDENT_URL, GET_ALL_COUNT_STUDENT, GET_STUDENT_BY_ID_URL, GET_STUDENT_URL, UPDATE_STUDENT_URL } from "../../configs/url";

export const getAllStudent = async (): Promise<StudentData[]> => {
    const response = await axiosInstance.get(GET_STUDENT_URL);
    return response.data
};

export const getStudentById = async (id: number): Promise<StudentData> => {
    const response = await axiosInstance.get(`${GET_STUDENT_BY_ID_URL}${id}`);
    return response.data
};

export const getAllCountStudent = async (): Promise<number> => {
    const response = await axiosInstance.get(GET_ALL_COUNT_STUDENT);
    return response.data;
};

export const getCountPresent = async (): Promise<number> => {
    const response = await axiosInstance.get(COUNT_PRESENT_URL);
    return response.data;
};

export const getCountLate = async (): Promise<number> => {
    const response = await axiosInstance.get(COUNT_LATE_URL);
    return response.data;
};

export const getCountAbsent = async (): Promise<number> => {
    const response = await axiosInstance.get(COUNT_ABSENT_URL);
    return response.data;
};

export const createStudent = async (students: Omit<StudentData, 'id'>): Promise<StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD')
    };
    const response = await axiosInstance.post(CREATE_STUDENT_URL, formattedValues);
    return response.data;
};

export const updateStudent = async (id: number, students: Omit<StudentData, 'id'>): Promise<StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD'),
    };
    const response = await axiosInstance.put(`${UPDATE_STUDENT_URL}${id}`, formattedValues);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${DELETE_STUDENT_URL}${id}`);
};


