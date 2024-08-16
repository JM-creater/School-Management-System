import { FormInstance } from "antd";
import { SubjectData } from "../../data/subject";
import { TeacherData } from "../../../../teacher/data/teachers";

export interface SubjectProps {
    children: React.ReactNode;
};

export interface SubjectClassAddProps {
    form: FormInstance;
    createNewSubject: (
        values: Omit<SubjectData, 'id'>
    ) => Promise<void>;
    teachers: TeacherData[];
};

export interface SubjectClassEditProps {
    form: FormInstance;
    handleEdit: (
        record: Omit<SubjectData, 'id'>
    ) => Promise<void>;
    teachers: TeacherData[];
};


