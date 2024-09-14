import { FormProps } from "antd";
import { IParentStore } from "../stores";

export interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
};

export interface CustomModalProps {
    open: boolean;
    title: string;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
    centered?: boolean;
};

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

export interface ParentContextProps extends IParentStore{
    rowClick: (
        record: ParentData
    ) => Promise<void>;

    searchParentQuery: (
        name?: string
    ) => Promise<void>;

    createNewParents: (
        parent: Omit<ParentData, 'id'>
    ) => Promise<void>;

    editParent: (
        id: number, 
        updatedParent: Omit<ParentData, 'id'>
    ) => Promise<void>;

    removeParent: (
        id: number
    ) => Promise<void>;

    fetchParentById: (
        parentId: number
    ) => Promise<void>;
};

export interface FormValuesProps {
    [key: string]: string 
                 | number 
                 | boolean 
                 | Date 
                 | undefined;
};

export interface CustomFormProps {
    form: FormInstance;
    fields: FormField[];
    onFinish: (values: FormValuesProps) => void;
    onFinishFailed?: FormProps['onFinishFailed'];
    layout?: 'vertical' | 'horizontal';
};