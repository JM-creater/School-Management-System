import { createContext, useState } from "react";
import { AttendanceContextTypes } from "../types/attendance-types";
import { AttendanceProps } from "./props/attendance-props";
import { 
    markAbsentAttendance,
    markLateAttendance, 
    markPresentAttendance, 
    updateStatusAbsent, 
    updateStatusLate, 
    updateStatusPresent 
} from "../../../services/attendance/attendance-service";
import { handleError } from "../../../configs/error-handling";

export const AttendanceContext = createContext<AttendanceContextTypes | null>(null);

export const AttendanceProvider: React.FC<AttendanceProps> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [markedStudents, setMarkedStudents] = useState<number[]>([]);

    const markStudentPresentAttendance = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return  await markPresentAttendance(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const markStudentLateAttendance = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return await markLateAttendance(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const markStudentAbsentAttendance = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return await markAbsentAttendance(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const markStudentPresentStatus = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return await updateStatusPresent(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const markStudentLateStatus = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return await updateStatusLate(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const markStudentAbsentStatus = async (
        studentId: number, 
        status: string
    ) => {
        setLoading(true);
        setError(null);
        return await updateStatusAbsent(studentId, status)
            .then((response) => {
                setMarkedStudents([...markedStudents, response]);
                setMarkedStudents(prevMarked => [...prevMarked, studentId]);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleValues = {
        loading,
        error,
        markedStudents,
        markStudentAbsentStatus,
        markStudentLateStatus,
        markStudentPresentAttendance,
        markStudentLateAttendance,
        markStudentAbsentAttendance,
        markStudentPresentStatus
    };

    return (
        <AttendanceContext.Provider value={handleValues}>
            {children}
        </AttendanceContext.Provider>
    )
};