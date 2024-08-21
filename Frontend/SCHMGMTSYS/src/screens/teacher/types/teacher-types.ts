import { TeacherData } from "../data/teachers";

export interface TeacherContextTypes {
    rowClick: (
        record: TeacherData
    ) => Promise<void>;

    searchTeacherQuery: (
        firstName?: string
    ) => Promise<void>;

    getTeacherFullNameById: (
        teacherId: number, 
        teachers: TeacherData[]
    ) => string;

    editTeacher: (
        id: number, 
        updatedTeacher: Omit<TeacherData, 'id'>
    ) => Promise<void>;

    fetchTeacherById: (
        teacherId: number
    ) => Promise<void>;

    removeTeacher: (
        id: number
    ) => Promise<void>; 

    createNewTeacher: (
        parent: Omit<TeacherData, 'id'>
    ) => Promise<void>;

    filteredTeachers: TeacherData[];
    teachers: TeacherData[];
    selectedTeacher: TeacherData | null;
    loading: boolean;
    error: string | null;
    overAllTeachers: number;
};