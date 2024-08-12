import { FormProps } from "antd";
import { ParentData } from "../data/parents";

export interface ParentContextType{
    onFinishFailed: FormProps<ParentData>['onFinishFailed'];
    createNewParents: (parent: Omit<ParentData, 'id'>) => void;
    parents: ParentData[];
    loading: boolean;
    error: string | null;
} 