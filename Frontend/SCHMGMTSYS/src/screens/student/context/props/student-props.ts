import { FormInstance } from "antd";
import { StudentData } from "../../data/student";
import { ParentData } from "../../../parents/data/parents";
import { ClassData } from "../../../curriculum/class/data/class";

export interface StudentProps {
    children: React.ReactNode;
};

export interface StudentAddFormProps {
    form: FormInstance;
    createNewStudent: (
        values: Omit<StudentData, 'id'>
    ) => Promise<void>;
    parents: ParentData[];
    classes: ClassData[];
};

export interface StudentEditFormProps {
    form: FormInstance;
    handleEdit: (
        teacher: Omit<StudentData, 'id'>
    ) => Promise<void>;
    parents: ParentData[];
    classes: ClassData[];
};