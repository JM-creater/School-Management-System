import { ClassData } from "../data/class";

export interface ClassContextTypes {
    searchClassQuery: (
        name?: string
    ) => Promise<void>;

    getClassNameById: (
        classId: number, 
        classData: ClassData[]
    ) => string;

    editClass: (
        id: number, 
        updatedClasses: Omit<ClassData, 'id'>
    ) => Promise<void>;

    removeClass: (
        id: number
    ) => Promise<void>;

    fetchClassById: (
        classId: number
    ) => Promise<void>;

    createNewClass: (
        values: Omit<ClassData, 'id'>
    ) => Promise<void>;

    rowClick: (
        record: ClassData
    ) => Promise<void>;

    loading: boolean;
    error: string | null;
    classes: ClassData[];
    filteredClasses: ClassData[];
    selectedClasses: ClassData | null;
    overAllClass: number;
};