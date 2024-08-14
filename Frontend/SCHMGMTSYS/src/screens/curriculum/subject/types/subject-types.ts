import { FormProps } from "antd";
import { SubjectData } from "../data/subject";

export interface SubjectContextTypes {
    removeSubject:(id: number) => Promise<void>;
    editSubject: (id: number, updatedSubject: Omit<SubjectData, 'id'>) => Promise<void>;
    fetchSubjectById: (subjectId: number) => Promise<void>;
    createNewSubject: (values: Omit<SubjectData, 'id'>) => Promise<void>;
    onFinishFailed: FormProps<SubjectData>['onFinishFailed'];
    selectedSubjects: SubjectData| null;
    subjects: SubjectData[];
    loading: boolean;
    error: string | null;
    overAllSubject: number;
}