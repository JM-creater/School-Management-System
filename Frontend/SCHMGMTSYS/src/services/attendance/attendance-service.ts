import { AxiosError, AxiosResponse } from "axios";
import { 
    ABSENT_ATTENDANE_URL, 
    LATE_ATTENDANCE_URL, 
    MARK_ATTENDANCE_URL, 
    PRESENT_ATTENDANCE_URL, 
    UPDATE_STATUS_ATTENDANCE_URL 
} from "../../configs/url";
import { axiosInstance } from "../api/axiosInstance";

export const markPresentAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance(); 
    return await client.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

export const markLateAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance();  
    return await client.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

export const markAbsentAttendance = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance(); 
    return await client.post<T>(`${MARK_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

export const updateStatusPresent = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance(); 
    return await client.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${PRESENT_ATTENDANCE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

export const updateStatusLate = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance(); 
    return await client.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${LATE_ATTENDANCE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};

export const updateStatusAbsent = async <T extends number>(
    studentId: T, 
    status: string
): Promise<T> => {
    const client = axiosInstance(); 
    return await client.put<T>(`${UPDATE_STATUS_ATTENDANCE_URL}${studentId}${ABSENT_ATTENDANE_URL}`, { 
        status 
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => {
        throw error;
    });
};
