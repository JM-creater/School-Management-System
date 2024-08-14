import { FormProps } from "antd";
import { ParentData } from "../data/parents";

export interface ParentContextType {
    createNewParents: (parent: Omit<ParentData, 'id'>) => void;
    editParent: (id: number, updatedParent: Omit<ParentData, 'id'>) => Promise<void>;
    removeParent: (id: number) => Promise<void>
    fetchParentById: (parentId: number) => Promise<void>;
    onFinishFailed: FormProps<ParentData>['onFinishFailed'];
    parents: ParentData[];
    loading: boolean;
    error: string | null;
    selectedParent: ParentData | null;
    overAllParent: number;
};