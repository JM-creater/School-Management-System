import { FormProps } from "antd";
import { StudentData } from "../data/student";

export interface StudentContextTypes {
    overAllStudent: number;
    selectedStudents: StudentData | null;
    students: StudentData[];
    loading: boolean;
    error: string | null;
    onFinishFailed: FormProps<StudentData>['onFinishFailed'];
    fetchStudentById: (studentId: number) => Promise<void>;
    createNewStudent: (values: Omit<StudentData, 'id'>) => void;
    editStudent: (id: number, updatedStudent: Omit<StudentData, 'id'>) => Promise<void>;
    removeStudent: (id: number) => Promise<void>; 
}