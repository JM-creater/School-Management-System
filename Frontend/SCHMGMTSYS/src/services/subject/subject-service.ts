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

/**
 * Creates a new subject by sending a POST request to the subject creation URL.
 *
 * @param {Omit<SubjectData, 'id'>} subj - The subject data to be created.
 * @return {Promise<SubjectData>} The created subject data.
 * @throws {Error} If there is an error during the request.
 */
export const createSubject = async <T extends Omit<SubjectData, 'id'>>(
    subj: T
): Promise<T extends Omit<SubjectData, 'id'> ? SubjectData : SubjectData> => {
    return await axiosInstance.post<T extends Omit<SubjectData, 'id'> ? SubjectData : SubjectData>(CREATE_SUBJECT_URL, subj)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Retrieves all subjects from the server.
 *
 * @return {Promise<SubjectData[]>} An array of subject data
 */
export const getAllSubject = async <T extends string | undefined>(): Promise<
    T extends string ? SubjectData[] : SubjectData[]
> => {
    return await axiosInstance.get<T extends string ? SubjectData[] : SubjectData[]>(GET_SUBJECT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Retrieves a subject by its ID from the server.
 *
 * @param {number | undefined} id - The ID of the subject to be retrieved.
 * @return {Promise<SubjectData>} The retrieved subject data.
 */
export const getSubjectById =  async <T extends number | undefined>(
    id: T
): Promise<T extends number ? SubjectData : SubjectData> => {
    return await axiosInstance.get<T extends number ? SubjectData : SubjectData>(`${GET_SUBJECT_BY_ID_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Retrieves the total count of subjects from the server.
 *
 * @return {Promise<number>} The total count of subjects
 */
export const getAllCountSubject = async <T extends string | undefined>(): Promise<
    T extends string ? number : number
> => {
    return await axiosInstance.get<T extends string ? number : number>(GET_ALL_COUNT_SUBJECT)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * Updates a subject by sending a PUT request to the subject update URL.
 *
 * @param {number | undefined} id - The ID of the subject to be updated.
 * @param {Omit<SubjectData, 'id'>} subj - The updated subject data.
 * @return {Promise<SubjectData>} The updated subject data.
 */
export const updateSubject = async <T extends number | undefined>(
    id: T, 
    subj: Omit<SubjectData, 'id'>
): Promise<T extends number ? SubjectData : SubjectData> => {
    return await axiosInstance.put<
        T extends number ? 
        SubjectData : SubjectData>(`${UPDATE_SUBJECT_URL}${id}`, subj)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Deletes a subject by sending a DELETE request to the subject deletion URL.
 *
 * @param {number | undefined} id - The ID of the subject to be deleted.
 * @return {Promise<SubjectData>} A promise that resolves when the deletion is complete.
 */
export const deleteSubject = async <T extends number | undefined>(
    id: T
): Promise<T extends number ? SubjectData : SubjectData> => {
    return await axiosInstance.delete<T extends number ? SubjectData : SubjectData>(`${DELETE_SUBJECT_URL}${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error; 
        });
};

/**
 * Searches for a subject by its name.
 *
 * @param {string | undefined} name - The name of the subject to search for.
 * @return {Promise<SubjectData[] | SubjectData>} A promise that resolves to an array of subject data if a name is provided, otherwise a single subject data.
 */
export const searchSubject = async <T extends string | undefined>(
    name?: T
): Promise<T extends string ? SubjectData[] : SubjectData[]> => {
    return await axiosInstance.get<T extends string ? SubjectData[] : SubjectData[]>(SEARCH_SUBJECT_URL, {
        params: { name },
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error; 
    });
};