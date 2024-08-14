import { createContext, useCallback, useEffect, useState } from "react";
import { StudentContextTypes } from "../types/student-types";
import { StudentProps } from "./props/student-props";
import { StudentData } from "../data/student";
import { FormProps } from "antd";
import { createStudent, deleteStudent, getAllCountStudent, getAllStudent, getStudentById, updateStudent } from "../../../services/student/student-service";
import { toast } from "react-toastify";

export const StudentContext = createContext<StudentContextTypes | null>(null);

export const StudentProvider: React.FC<StudentProps> = ({ children }) => {

    const [students, setStudents] = useState<StudentData[]>([]);
    const [overAllStudent, setOverAllStudents] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudents, setSelectedStudents] = useState<StudentData | null>(null);

    const onFinishFailed: FormProps<StudentData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await getAllStudent();
                setStudents(response);
               
                const overAllStudentResponse = await getAllCountStudent();
                setOverAllStudents(overAllStudentResponse);
            } catch (error) {
                console.log(error);
                setError('Failed to catch students');
            } finally {
                setLoading(false);
            }
        }

        fetchStudents();
    }, []);

    const fetchStudentById = useCallback(async (studentId: number) => {
        try {
            const response = await getStudentById(studentId);
            setSelectedStudents(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch student by ID');
        }
    }, []);

    const createNewStudent = async (values: Omit<StudentData, 'id'>) => {
        setLoading(true);
    
        try {
            const formattedValues = {
                ...values,
                parent: {
                    id: values.parent_id
                },
                classroom: {
                    id: values.classroom_id
                }
            };
            const response = await createStudent(formattedValues);
            setStudents([...students, response]);
            toast.success("Student added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add student'); 
        } finally {
            setLoading(false);
        }
    };

    const editStudent = async (id: number, updatedStudent: Omit<StudentData, 'id'>) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...updatedStudent,
                parent: {
                    id: updatedStudent.parent_id
                },
                classroom: {
                    id: updatedStudent.classroom_id
                }
            };
            const response = await updateStudent(id, formattedValues);
            setStudents(students.map(s => s.id === id ? response : s));
            toast.success("Student updated successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to update student'); 
        } finally {
            setLoading(false);
        }
    };

    const removeStudent = async (id: number) => {
        setLoading(true);
        try {
            await deleteStudent(id);
            setStudents((prevStudents) => prevStudents.filter(t => t.id !== id));
        } catch (error) {
            console.log(error);
            setError('Failed to delete student');
        } finally {
            setLoading(false);
        }
    };

    const handleValue = {
        overAllStudent,
        students,
        selectedStudents,
        loading,
        error,
        onFinishFailed,
        fetchStudentById,
        createNewStudent,
        editStudent,
        removeStudent
    };

    return (
        <StudentContext.Provider value={handleValue}>
            {children}
        </StudentContext.Provider>
    )
}