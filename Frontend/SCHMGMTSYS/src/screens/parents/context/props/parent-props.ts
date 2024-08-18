import { FormInstance } from "antd";
import { ParentData } from "../../data/parents";

export interface ParentProps {
    children: React.ReactNode;
};

export interface ParentAddModalProps {
    form: FormInstance;
    createNewParents: (
        parent: Omit<ParentData, 'id'>
    ) => Promise<void>;
};

export interface ParentEditModalProps {
    form: FormInstance;
    handleEdit: (
        record: Omit<ParentData, 'id'>
    ) => Promise<void>;
};