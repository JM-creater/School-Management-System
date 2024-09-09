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
import { AxiosError, AxiosResponse } from "axios";

// Get all students
export const getAllStudent = async (): Promise<StudentData[]> => {
    const client = axiosInstance(); 
    return await client.get<StudentData[]>(GET_STUDENT_URL)
        .then((response: AxiosResponse<StudentData[]>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Get student by ID
export const getStudentById = async (
    id: number
): Promise<StudentData> => {
    const client = axiosInstance(); 
    return await client.get<StudentData>(`${GET_STUDENT_BY_ID_URL}${id}`)
        .then((response: AxiosResponse<StudentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Get the total count of students
export const getAllCountStudent = async (): Promise<number> => {
    const client = axiosInstance(); 
    return await client.get<number>(GET_ALL_COUNT_STUDENT)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Get the count of present students
export const getCountPresent = async (): Promise<number> => {
    const client = axiosInstance();  
    return await client.get<number>(COUNT_PRESENT_URL)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Get the count of late students
export const getCountLate = async (): Promise<number> => {
    const client = axiosInstance();
    return await client.get<number>(COUNT_LATE_URL)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Get the count of absent students
export const getCountAbsent = async (): Promise<number> => {
    const client = axiosInstance(); 
    return await client.get<number>(COUNT_ABSENT_URL)
        .then((response: AxiosResponse<number>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Create a new student
export const createStudent = async (
    student: Omit<StudentData, 'id'>
): Promise<StudentData> => {
    const client = axiosInstance(); 
    const formattedValues = {
        ...student,
        dateOfBirth: student.dateOfBirth.format('YYYY-MM-DD'),
        enrollmentDate: student.enrollmentDate.format('YYYY-MM-DD')
    };
    return await client.post<StudentData>(CREATE_STUDENT_URL, formattedValues)
        .then((response: AxiosResponse<StudentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Update student by ID
export const updateStudent = async (
    id: number, 
    student: Omit<StudentData, 'id'>
): Promise<StudentData> => {
    const client = axiosInstance();  
    const formattedValues = {
        ...student,
        dateOfBirth: student.dateOfBirth.format('YYYY-MM-DD'),
        enrollmentDate: student.enrollmentDate.format('YYYY-MM-DD'),
    };
    return await client.put<StudentData>(`${UPDATE_STUDENT_URL}${id}`, formattedValues)
        .then((response: AxiosResponse<StudentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Delete student by ID
export const deleteStudent = async (
    id: number
): Promise<StudentData> => {
    const client = axiosInstance();  
    return await client.delete<StudentData>(`${DELETE_STUDENT_URL}${id}`)
        .then((response: AxiosResponse<StudentData>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
};

// Search for students by name
export const searchStudent = async (
    name?: string
): Promise<StudentData[]> => {
    const client = axiosInstance(); 
    return await client.get<StudentData[]>(SEARCH_STUDENT_URL, {
        params: { name },
    }).then((response: AxiosResponse<StudentData[]>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};
