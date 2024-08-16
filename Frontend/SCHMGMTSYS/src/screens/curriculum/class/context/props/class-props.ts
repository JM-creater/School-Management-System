import { FormInstance } from "antd";
import { ClassData } from "../../data/class";

export interface ClassProps {
    children: React.ReactNode;
};

export interface ClassAddModalProps {
    form: FormInstance;
    createNewClass: (
        values: Omit<ClassData, 'id'>
    ) => Promise<void>;
};

export interface ClassEditModalProps {
    form: FormInstance;
    handleEdit: (
        record: Omit<ClassData, 'id'>
    ) => Promise<void>;
};