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

/**
 * Fetches a list of all students by sending a GET request to the student retrieval URL.
 *
 * @return {Promise<StudentData[]>} The list of all students.
 * @throws {Error} If there is an error during the request.
*/
export const getAllStudent = async <T extends string | undefined>(): Promise<
    T extends string ? StudentData[] : StudentData[]
> => {
    return await axiosInstance.get<T extends string ? StudentData[] : StudentData[]>(GET_STUDENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches a student's data by their ID by sending a GET request to the student retrieval URL.
 *
 * @param {number | undefined} id - The ID of the student to retrieve.
 * @return {Promise<StudentData>} The student's data.
 * @throws {Error} If there is an error during the request.
*/
export const getStudentById = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? StudentData : StudentData> => {
    return await axiosInstance.get<T extends number ? StudentData : StudentData>(`${GET_STUDENT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves the total count of students by sending a GET request to the student count URL.
 *
 * @return {Promise<number>} The total number of students.
 * @throws {Error} If there is an error during the request.
 */
export const getAllCountStudent = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get(GET_ALL_COUNT_STUDENT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves the total count of students marked as present by sending a GET request to the present count URL.
 *
 * @return {Promise<number>} The total number of students marked as present.
 * @throws {Error} If there is an error during the request.
*/
export const getCountPresent = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(COUNT_PRESENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves the total count of students marked as late by sending a GET request to the late count URL.
 *
 * @return {Promise<number>} The total number of students marked as late.
 * @throws {Error} If there is an error during the request.
*/
export const getCountLate = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(COUNT_LATE_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Retrieves the total count of students marked as absent by sending a GET request to the absent count URL.
 *
 * @return {Promise<number>} The total number of students marked as absent.
 * @throws {Error} If there is an error during the request.
*/
export const getCountAbsent = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(COUNT_ABSENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Creates a new student by sending a POST request to the student creation URL.
 *
 * @param {Omit<StudentData, 'id'>} students - The student data to be created, excluding the 'id'.
 * @return {Promise<StudentData>} The created student data.
 * @throws {Error} If there is an error during the request.
*/
export const createStudent = async <T extends Omit<StudentData, 'id'>>(
    students: T
): Promise<T extends Omit<StudentData, 'id'> ? StudentData : StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD')
    };
    return await axiosInstance.post<T extends Omit<StudentData, 'id'> ? StudentData : StudentData>(CREATE_STUDENT_URL, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Updates an existing student by sending a PUT request to the student update URL.
 *
 * @param {T} id - The ID of the student to be updated.
 * @param {Omit<StudentData, 'id'>} students - The updated student data, excluding the 'id'.
 * @return {Promise<StudentData>} The updated student data.
 * @throws {Error} If there is an error during the request.
*/
export const updateStudent = async <T extends number | undefined>(
    id: T, 
    students: Omit<StudentData, 'id'>
): Promise<T extends Omit<StudentData, 'id'> ? StudentData : StudentData> => {
    const formattedValues = {
        ...students,
        dateOfBirth: moment(students.dateOfBirth).format('YYYY-MM-DD'),
        enrollmentDate: moment(students.enrollmentDate).format('YYYY-MM-DD'),
    };
    return await axiosInstance.put<T extends Omit<StudentData, 'id'> ? StudentData : StudentData>(`${UPDATE_STUDENT_URL}${id}`, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Deletes a student by sending a DELETE request to the student deletion URL.
 *
 * @param {T extends number | undefined} id - The ID of the student to be deleted.
 * @return {Promise<StudentData>} The data of the deleted student.
 * @throws {Error} If there is an error during the request.
*/
export const deleteStudent = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? StudentData : StudentData> => {
    return await axiosInstance.delete<T extends number ? StudentData : StudentData>(`${DELETE_STUDENT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Searches for students by name by sending a GET request to the student search URL.
 *
 * @param {T extends string | undefined} name - The name of the student to search for. If not provided, all students are returned.
 * @return {Promise<StudentData[]>} A list of students matching the search criteria.
 * @throws {Error} If there is an error during the request.
*/
export const searchStudent = async <T extends string | undefined>(
    name?: T
): Promise<T extends string ? StudentData[] : StudentData[]> => {
    return await axiosInstance.get<T extends string ? StudentData[] : StudentData[]>(SEARCH_STUDENT_URL, {
        params: { name },
    }).then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
