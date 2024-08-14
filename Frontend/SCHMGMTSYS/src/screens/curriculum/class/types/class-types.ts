import { FormProps } from "antd";
import { ClassData } from "../data/class";

export interface ClassContextTypes {
    editClass: (id: number, updatedClasses: Omit<ClassData, 'id'>) => Promise<void>;
    removeClass: (id: number) => Promise<void>;
    fetchClassById: (classId: number) => Promise<void>;
    createNewClass: (values: Omit<ClassData, 'id'>) => void;
    onFinishFailed: FormProps<ClassData>['onFinishFailed'];
    loading: boolean;
    error: string | null;
    classes: ClassData[];
    selectedClasses: ClassData | null;
    overAllClass: number;
};