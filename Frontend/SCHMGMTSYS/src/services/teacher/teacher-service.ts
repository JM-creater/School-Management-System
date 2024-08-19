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

/**
 * Creates a new teacher by sending a POST request to the teacher creation URL.
 *
 * @param {Omit<TeacherData, 'id'>} teacher - The teacher data to be created, excluding the 'id' field.
 * @return {Promise<TeacherData>} The created teacher data.
 * @throws {Error} If there is an error during the request.
*/
export const createTeacher = async <T extends Omit<TeacherData, 'id'>>(
    teacher: T
): Promise<T extends Omit<TeacherData, 'id'> ? TeacherData : TeacherData> => {
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'), 
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD')
    };
    return await axiosInstance.post<T extends Omit<TeacherData, 'id'> ? TeacherData : TeacherData>(CREATE_TEACHER_URL, formattedValues)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Fetches all teachers by sending a GET request to the teacher retrieval URL.
 *
 * @return {Promise<TeacherData[]>} The array of teacher data.
 * @throws {Error} If there is an error during the request.
*/
export const getAllTeacher = async <T extends string | undefined>(): Promise<
    T extends string ? TeacherData[] : TeacherData[]
> => {
    return await axiosInstance.get(GET_TEACHER_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches a teacher by their ID by sending a GET request to the teacher retrieval URL.
 *
 * @param {number | undefined} id - The ID of the teacher to be retrieved.
 * @return {Promise<TeacherData>} The teacher data associated with the given ID.
 * @throws {Error} If there is an error during the request.
 */
export const getTeacherById = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? TeacherData : TeacherData> => {
    return await axiosInstance.get<T extends number ? TeacherData : TeacherData>(`${GET_TEACHER_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Fetches the total count of teachers by sending a GET request to the teacher count retrieval URL.
 *
 * @return {Promise<number>} The total count of teachers.
 * @throws {Error} If there is an error during the request.
 */
export const getAllCountTeacher = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(GET_ALL_COUNT_TEACHER)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

/**
 * Updates an existing teacher's data by sending a PUT request to the teacher update URL.
 *
 * @param {number | undefined} id - The ID of the teacher to be updated.
 * @param {Omit<TeacherData, 'id'>} teacher - The updated teacher data excluding the 'id' field.
 * @return {Promise<TeacherData>} The updated teacher data.
 * @throws {Error} If there is an error during the request.
 */
export const updateTeacher = async <T extends number | undefined>(
    id: T, 
    teacher: Omit<TeacherData, 'id'>
): Promise<T extends number ? TeacherData : TeacherData> => {
    const formattedValues = {
        ...teacher,
        dateOfBirth: teacher.dateOfBirth.format('YYYY-MM-DD'), 
        employmentDate: teacher.employmentDate.format('YYYY-MM-DD')
    };
    return await axiosInstance.put<T extends number ? TeacherData : TeacherData>(`${UPDATE_TEACHER_URL}${id}`, formattedValues)
    .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Deletes a teacher by sending a DELETE request to the teacher deletion URL.
 *
 * @param {number | undefined} id - The ID of the teacher to be deleted.
 * @return {Promise<void>} Resolves when the teacher has been successfully deleted.
 * @throws {Error} If there is an error during the request.
 */
export const deleteTeacher = async <T extends number | undefined>(
    id: T
): Promise<void> => {
    return await axiosInstance.delete(`${DELETE_TEACHER_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

export const searchTeacher = async <T extends string | undefined>(
    firstName?: T
): Promise<T extends string ? TeacherData[] : TeacherData[]> => {
    return await axiosInstance.get<T extends string ? TeacherData[] : TeacherData[]>(SEARCH_TEACHER_URL, {
        params: { firstName }
    }).then((response) => response.data)
    .catch((error) => {
        throw error
    });
};