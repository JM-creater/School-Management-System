import { createContext, useState } from "react";
import { AttendanceContextTypes } from "../types/attendance-types";
import { AttendanceProps } from "./props/attendance-props";
import { markAbsentAttendance, markLateAttendance, markPresentAttendance, updateStatusAbsent, updateStatusLate, updateStatusPresent } from "../../../services/attendance/attendance-service";

export const AttendanceContext = createContext<AttendanceContextTypes | null>(null);

export const AttendanceProvider: React.FC<AttendanceProps> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [markedStudents, setMarkedStudents] = useState<number[]>([]);

    const markStudentPresentAttendance = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await markPresentAttendance(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to marked attendance'); 
        } finally {
            setLoading(false);
        }
    };

    const markStudentLateAttendance = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await markLateAttendance(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to marked attendance'); 
        } finally {
            setLoading(false);
        }
    };

    const markStudentAbsentAttendance = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await markAbsentAttendance(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to marked attendance'); 
        } finally {
            setLoading(false);
        }
    };

    const markStudentPresentStatus = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await updateStatusPresent(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to update attendance status'); 
        } finally {
            setLoading(false);
        }
    };

    const markStudentLateStatus = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await updateStatusLate(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to update attendance status'); 
        } finally {
            setLoading(false);
        }
    };

    const markStudentAbsentStatus = async (studentId: number, status: string) => {
        setLoading(true);
        try {
            const response = await updateStatusAbsent(studentId, status);
            setMarkedStudents([...markedStudents, response]);
        } catch (error) {
            console.log(error);
            setError('Failed to update attendance status'); 
        } finally {
            setLoading(false);
        }
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
}