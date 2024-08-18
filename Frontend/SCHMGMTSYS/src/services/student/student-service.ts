import moment from "moment";
import { StudentData } from "../../screens/student/data/student";
import { axiosInstance } from "../api/axiosInstance";
import { 
    COUNT_ABSENT_URL, 
    COUNT_LATE_URL, 
    COUNT_PRESENT_URL, 
    CREATE_STUDENT_URL, 
    DELETE_STUDENT_URL, 
    GET_ALL_COUNT_STUDENT, 
    GET_STUDENT_BY_ID_URL, 
    GET_STUDENT_URL, 
    SEARCH_STUDENT_URL, 
    UPDATE_STUDENT_URL 
} from "../../configs/url";

export const getAllStudent = async (): Promise<StudentData[]> => {
    return await axiosInstance.get(GET_STUDENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getStudentById = async (id: number): Promise<StudentData> => {
    return await axiosInstance.get(`${GET_STUDENT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllCountStudent = async (): Promise<number> => {
    return await axiosInstance.get(GET_ALL_COUNT_STUDENT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getCountPresent = async (): Promise<number> => {
    return await axiosInstance.get(COUNT_PRESENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getCountLate = async (): Promise<number> => {
    return await axiosInstance.get(COUNT_LATE_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getCountAbsent = async (): Promise<number> => {
    return await axiosInstance.get(COUNT_ABSENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const createStudent = async (
    students: Omit<StudentData, 'id'>
): Promise<StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD')
    };
    return await axiosInstance.post(CREATE_STUDENT_URL, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateStudent = async (
    id: number, 
    students: Omit<StudentData, 'id'>
): Promise<StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD'),
    };
    return await axiosInstance.put(`${UPDATE_STUDENT_URL}${id}`, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const deleteStudent = async (
    id: number
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_STUDENT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const searchStudent = async (
    name?: string
): Promise<StudentData[]> => {
    return await axiosInstance.get(SEARCH_STUDENT_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
