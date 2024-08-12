import { FormProps } from "antd";
import { ParentData } from "../data/parents";

export interface ParentContextType{
    editParent: (parentId: number, parent: ParentData) => Promise<void>;
    fetchParentById: (parentId: number) => Promise<void>;
    onFinishFailed: FormProps<ParentData>['onFinishFailed'];
    createNewParents: (parent: Omit<ParentData, 'id'>) => void;
    parents: ParentData[];
    loading: boolean;
    error: string | null;
    selectedParent: ParentData | null;
} 