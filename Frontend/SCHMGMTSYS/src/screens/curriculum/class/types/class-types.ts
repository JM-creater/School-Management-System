import { FormProps } from "antd";
import { ClassData } from "../data/class";

export interface ClassContextTypes {
    createNewClass: (values: Omit<ClassData, 'id'>) => void;
    onFinishFailed: FormProps<ClassData>['onFinishFailed'];
    loading: boolean;
    error: string | null;
    classes: ClassData[];
}