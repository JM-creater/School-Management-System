export interface AttendanceContextTypes {
    markStudentAbsentStatus: (studentId: number, status: string) => void;
    markStudentLateStatus: (studentId: number, status: string) => void;
    markStudentPresentStatus: (studentId: number, status: string) => void;
    markStudentAbsentAttendance: (studentId: number, status: string) => void;
    markStudentLateAttendance: (studentId: number, status: string) => void;
    markStudentPresentAttendance: (studentId: number, status: string) => void;
    markedStudents: number[];
    loading: boolean;
    error: string | null;
}