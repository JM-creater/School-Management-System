import { StudentData } from "../data/student";

export interface StudentContextTypes {
    searchStudentQuery: (
        name?: string
    ) => Promise<void>;

    fetchStudentById: (
        studentId: number
    ) => Promise<void>;

    createNewStudent: (
        values: Omit<StudentData, 'id'>
    ) => Promise<void>;

    editStudent: (
        id: number, 
        updatedStudent: Omit<StudentData, 'id'>
    ) => Promise<void>;

    removeStudent: (
        id: number
    ) => Promise<void>; 

    countPresent: number;
    countLate: number;
    countAbsent: number;
    overAllStudent: number;
    selectedStudents: StudentData | null;
    students: StudentData[];
    filteredStudents: StudentData[];
    loading: boolean;
    error: string | null;
};