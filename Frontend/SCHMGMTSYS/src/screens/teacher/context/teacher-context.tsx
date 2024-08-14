import { createContext, useCallback, useEffect, useState } from "react";
import { TeacherContextTypes } from "../types/teacher-types";
import { TeacherProps } from "./props/teacher-props";
import { TeacherData } from "../data/teachers";
import { FormProps } from "antd";
import { createTeacher, deleteTeacher, getAllTeacher, getTeacherById, updateTeacher } from "../../../services/teacher/teacher-service";
import { toast } from "react-toastify";
import { getAllCountStudent } from "../../../services/student/student-service";

export const TeacherContext = createContext<TeacherContextTypes | null>(null);

export const TeacherProvider: React.FC<TeacherProps> = ({ children }) => {

    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [overAllTeachers, setOverAllTeachers] = useState<number>(0);
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

                const overAllTeacherResponse = await getAllCountStudent();
                setOverAllTeachers(overAllTeacherResponse);
            } catch (error) {
                console.log(error);
                setError('Failed to catch teachers');
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, []);

    const getTeacherFullNameById = (teacherId: number, teachers: TeacherData[]): string => {
        const teacher = teachers.find(t => t.id === teacherId);
        return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No Teacher Assigned';
    };

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
            const formattedValues = {
                ...teacher,
                classroom: {
                    id: teacher.classroom_id
                }
            };
            const response = await createTeacher(formattedValues);
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
            const formattedValues = {
                ...updatedTeacher,
                classroom: {
                    id: updatedTeacher.classroom_id
                }
            };
            const response = await updateTeacher(id, formattedValues);
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
        } finally {
            setLoading(false);
        }
    };

    const handleValues = {
        getTeacherFullNameById,
        onFinishFailed,
        fetchTeacherById,
        createNewTeacher,
        removeTeacher,
        editTeacher,
        teachers,
        selectedTeacher,
        error,
        loading,
        overAllTeachers
    };

    return (
        <TeacherContext.Provider value={handleValues}>
            {children}
        </TeacherContext.Provider>
    )
}