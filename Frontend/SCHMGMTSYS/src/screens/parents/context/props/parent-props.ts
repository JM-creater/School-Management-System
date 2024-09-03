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

export interface ParentContextType {
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

    filteredParents:  ParentData[];
    parents: ParentData[];
    loading: boolean;
    error: string | null;
    selectedParent: ParentData | null;
    overAllParent: number;
};
