import { createContext, useCallback, useEffect, useState } from "react";
import { TeacherContextTypes } from "../types/teacher-types";
import { TeacherProps } from "./props/teacher-props";
import { TeacherData } from "../data/teachers";
import { FormProps } from "antd";
import { createTeacher, deleteTeacher, getAllTeacher, getTeacherById, updateTeacher } from "../../../services/teacher/teacher-service";
import { toast } from "react-toastify";

export const TeacherContext = createContext<TeacherContextTypes | null>(null);

export const TeacherProvider: React.FC<TeacherProps> = ({ children }) => {

    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);

    const onFinishFailed: FormProps<TeacherData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const response = await getAllTeacher();
                setTeachers(response);
            } catch (error) {
                console.log(error);
                setError('Failed to catch teachers');
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, []);

    const fetchTeacherById = useCallback(async (teacherId: number) => {
        try {
            const response = await getTeacherById(teacherId);
            setSelectedTeacher(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch teacher by ID');
        }
    }, []);

    const createNewTeacher = async (teacher: Omit<TeacherData, 'id'>) => {
        setLoading(true);

        try {
            const response = await createTeacher(teacher);
            setTeachers([...teachers, response]);
            toast.success("Teacher added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add teacher'); 
        } finally {
            setLoading(false);
        }
    };

    const editTeacher = async (id: number, updatedTeacher: Omit<TeacherData, 'id'>) => {
        setLoading(true);
        try {
            const response = await updateTeacher(id, updatedTeacher);
            setTeachers(teachers.map(t => t.id === id ? response : t));
            toast.success("Teacher updated successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to update parent'); 
        } finally {
            setLoading(false);
        }
    };

    const removeTeacher = async (id: number) => {
        setLoading(true);
        try {
            await deleteTeacher(id);
            setTeachers((prevTeacher) => prevTeacher.filter(t => t.id !== id));
        } catch (error) {
            console.log(error);
            setError('Failed to delete teacher');
        }
    };

    const handleValues = {
        onFinishFailed,
        fetchTeacherById,
        createNewTeacher,
        removeTeacher,
        editTeacher,
        teachers,
        selectedTeacher,
        error,
        loading
    };

    return (
        <TeacherContext.Provider value={handleValues}>
            {children}
        </TeacherContext.Provider>
    )
}