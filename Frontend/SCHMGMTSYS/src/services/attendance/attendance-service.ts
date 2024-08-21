import { 
    ABSENT_ATTENDANE_URL, 
    LATE_ATTENDANCE_URL, 
    MARK_ATTENDANCE_URL, 
    PRESENT_ATTENDANCE_URL, 
    UPDATE_STATUS_ATTENDANCE_URL 
} from "../../configs/url";
import { axiosInstance } from "../api/axiosInstance";

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance is being marked.
 * @param {string} status - The attendance status to be marked. This should be "Present".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful marking of attendance.
 * @throws {Error} - Throws an error if the attendance marking fails.
 */
export const markPresentAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    return await axiosInstance.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status })
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance is being marked.
 * @param {string} status - The attendance status to be marked. This should be "Late".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful marking of attendance.
 * @throws {Error} - Throws an error if the attendance marking fails.
 */
export const markLateAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    return await axiosInstance.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance is being marked.
 * @param {string} status - The attendance status to be marked. This should be "Absent".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful marking of attendance.
 * @throws {Error} - Throws an error if the attendance marking fails.
 */
export const markAbsentAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    return await axiosInstance.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance status is being updated.
 * @param {string} status - The attendance status to be updated. This should be "Present".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful update of attendance status.
 * @throws {Error} - Throws an error if the attendance status update fails.
 */
export const updateStatusPresent = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    return await axiosInstance.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance status is being updated.
 * @param {string} status - The attendance status to be updated. This should be "Late".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful update of attendance status.
 * @throws {Error} - Throws an error if the attendance status update fails.
 */
export const updateStatusLate = async <T extends number>(
    studentId: number, 
    status: string
): Promise<T> => {
    return await axiosInstance.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

/**
 * @template T - The type of the student ID (usually a number).
 * @param {T} studentId - The unique ID of the student whose attendance status is being updated.
 * @param {string} status - The attendance status to be updated. This should be "Absent".
 * @returns {Promise<T>} - A promise that resolves with the student ID upon successful update of attendance status.
 * @throws {Error} - Throws an error if the attendance status update fails.
 */
export const updateStatusAbsent = async <T extends number>(
    studentId: number, 
    status: string
): Promise<T> => {
    return await axiosInstance.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status })
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};