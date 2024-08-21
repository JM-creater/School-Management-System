import { SubjectData } from "../data/subject";

export interface SubjectContextTypes {
    searchSubjectQuery: (
        name?: string
    ) => Promise<void>;
    
    removeSubject:(
        id: number
    ) => Promise<void>;

    editSubject: (
        id: number, 
        updatedSubject: Omit<SubjectData, 'id'>
    ) => Promise<void>;

    fetchSubjectById: (
        subjectId: number
    ) => Promise<void>;

    createNewSubject: (
        values: Omit<SubjectData, 'id'>
    ) => Promise<void>;

    rowClick: (
        record: SubjectData
    ) =>  Promise<void>;

    selectedSubjects: SubjectData| null;
    subjects: SubjectData[];
    filteredSubjects: SubjectData[];
    loading: boolean;
    error: string | null;
    overAllSubject: number;
};