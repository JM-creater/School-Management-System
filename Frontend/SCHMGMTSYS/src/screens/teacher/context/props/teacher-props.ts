import { FormInstance } from "antd";
import { TeacherData } from "../../data/teachers";
import { ClassData } from "../../../curriculum/class/data/class";

export interface TeacherProps {
    children: React.ReactNode;
};

export interface ModalAddTeacherProps {
    form: FormInstance;
    createNewTeacher: (
        parent: Omit<TeacherData, 'id'>
    ) => Promise<void>;
    classes: ClassData[];
};

export interface ModalEditTeacherProps {
    form: FormInstance;
    handleEdit: (
        teacher: Omit<TeacherData, 'id'>
    ) => Promise<void>;
    classes: ClassData[];
};