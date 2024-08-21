export interface AttendanceContextTypes {
    markStudentAbsentStatus: (
        studentId: number, 
        status: string
    ) => Promise<void>;

    markStudentLateStatus: (
        studentId: number, 
        status: string
    ) => Promise<void>;

    markStudentPresentStatus: (
        studentId: number, 
        status: string
    ) => Promise<void>;

    markStudentAbsentAttendance: (
        studentId: number, 
        status: string
    ) => Promise<void>;

    markStudentLateAttendance: (
        studentId: number, 
        status: string
    ) => Promise<void>;

    markStudentPresentAttendance: (
        studentId: number, 
        status: string
    ) => Promise<void>;
    
    markedStudents: number[];
    loading: boolean;
    error: string | null;
}