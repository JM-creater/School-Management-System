import { FormProps } from "antd";
import { TeacherData } from "../data/teachers";

export interface TeacherContextTypes {
    editTeacher: (id: number, updatedTeacher: Omit<TeacherData, 'id'>) => Promise<void>;
    fetchTeacherById: (teacherId: number) => Promise<void>;
    removeTeacher: (id: number) => Promise<void>; 
    createNewTeacher: (parent: Omit<TeacherData, 'id'>) => void;
    onFinishFailed: FormProps<TeacherData>['onFinishFailed'];
    teachers: TeacherData[];
    selectedTeacher: TeacherData | null;
    loading: boolean;
    error: string | null;
};