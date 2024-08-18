import { 
    ABSENT_ATTENDANE_URL, 
    GET_STUDENT_URL, 
    LATE_ATTENDANCE_URL, 
    MARK_ATTENDANCE_URL, 
    PRESENT_ATTENDANCE_URL, 
    UPDATE_STATUS_ATTENDANCE_URL 
} from "../../configs/url";
import { AttendanceData } from "../../screens/attendance/data/attendance";
import { axiosInstance } from "../api/axiosInstance";

export const markPresentAttendance = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status })
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const markLateAttendance = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const markAbsentAttendance = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateStatusPresent = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateStatusLate = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateStatusAbsent = async (
    studentId: number, 
    status: string
) => {
    return await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status })
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const fetchStudents = async (): Promise<AttendanceData[]> => {
    return await axiosInstance.get(GET_STUDENT_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};