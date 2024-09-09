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

    const markStudentPresentAttendance = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await markPresentAttendance<TNumber>(studentId, status)
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

    const markStudentLateAttendance = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await markLateAttendance<TNumber>(studentId, status)
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

    const markStudentAbsentAttendance = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await markAbsentAttendance<TNumber>(studentId, status)
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

    const markStudentPresentStatus = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateStatusPresent<TNumber>(studentId, status)
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

    const markStudentLateStatus = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateStatusLate<TNumber>(studentId, status)
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

    const markStudentAbsentStatus = async <TNumber extends number>(
        studentId: TNumber, 
        status: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateStatusAbsent<TNumber>(studentId, status)
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

    return (
        <AttendanceContext.Provider 
            value={{
                loading,
                error,
                markedStudents,
                markStudentAbsentStatus,
                markStudentLateStatus,
                markStudentPresentAttendance,
                markStudentLateAttendance,
                markStudentAbsentAttendance,
                markStudentPresentStatus
            }}
        >
            {children}
        </AttendanceContext.Provider>
    )
};