import { FormProps } from "antd";
import { ClassData } from "../data/class";

export interface ClassContextTypes {
    removeClass: (id: number) => Promise<void>;
    fetchClassById: (classId: number) => Promise<void>;
    createNewClass: (values: Omit<ClassData, 'id'>) => void;
    onFinishFailed: FormProps<ClassData>['onFinishFailed'];
    loading: boolean;
    error: string | null;
    classes: ClassData[];
    selectedClasses: ClassData | null;
};