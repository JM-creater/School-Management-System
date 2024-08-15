import { ABSENT_ATTENDANE_URL, GET_STUDENT_URL, LATE_ATTENDANCE_URL, MARK_ATTENDANCE_URL, PRESENT_ATTENDANCE_URL, UPDATE_STATUS_ATTENDANCE_URL } from "../../configs/url";
import { AttendanceData } from "../../screens/attendance/data/attendance";
import { axiosInstance } from "../api/axiosInstance";

export const markPresentAttendance = async (studentId: number, status: string) => {
    const response = await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status });
    return response.data;
};

export const markLateAttendance = async (studentId: number, status: string) => {
    const response = await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status });
    return response.data;
};

export const markAbsentAttendance = async (studentId: number, status: string) => {
    const response = await axiosInstance.post(`${MARK_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status });
    return response.data;
};

export const updateStatusPresent = async (studentId: number, status: string) => {
    const response = await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { status });
    return response.data;
};

export const updateStatusLate = async (studentId: number, status: string) => {
    const response = await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { status });
    return response.data;
};

export const updateStatusAbsent = async (studentId: number, status: string) => {
    const response = await axiosInstance.put(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { status });
    return response.data;
};

export const fetchStudents = async (): Promise<AttendanceData[]> => {
    const response = await axiosInstance.get(GET_STUDENT_URL);
    return response.data;
};