import { createContext, useCallback, useEffect, useState } from "react";
import { TeacherContextTypes } from "../types/teacher-types";
import { TeacherProps } from "./props/teacher-props";
import { TeacherData } from "../data/teachers";
import { createTeacher, deleteTeacher, getAllTeacher, getTeacherById, searchTeacher, updateTeacher } from "../../../services/teacher/teacher-service";
import { toast } from "react-toastify";
import { getAllCountStudent } from "../../../services/student/student-service";
import { handleError } from "../../../configs/error-handling";

export const TeacherContext = createContext<TeacherContextTypes | null>(null);

export const TeacherProvider: React.FC<TeacherProps> = ({ children }) => {

    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<TeacherData[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);
    const [overAllTeachers, setOverAllTeachers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAllTeacher().then((response) => {
            setTeachers(response);
            setFilteredTeachers(response);
            return getAllCountStudent();
        }).then((overAllTeacherResponse) => {
            setOverAllTeachers(overAllTeacherResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const getTeacherFullNameById = (
        teacherId: number, 
        teachers: TeacherData[]
    ): string => {
        const teacher = teachers.find(t => t.id === teacherId);
        return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No Teacher Assigned';
    };

    const fetchTeacherById = useCallback(async (
        teacherId: number
    ) => {
        getTeacherById(teacherId)
            .then((response) => {
                setSelectedTeacher(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            })
    }, []);

    const createNewTeacher = async (
        teacher: Omit<TeacherData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...teacher,
            classroom: {
                id: teacher.classroom_id
            }
        };
        return await createTeacher(formattedValues)
            .then((response) => {
                setTeachers([...teachers, response]);
                toast.success(`Teacher ${teacher.firstName} ${teacher.lastName} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };
    
    const editTeacher = async (
        id: number, 
        updatedTeacher: Omit<TeacherData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...updatedTeacher,
            classroom: {
                id: updatedTeacher.classroom_id
            }
        };
        return await updateTeacher(id, formattedValues)
            .then((response) => {
                setTeachers(teachers.map(t => t.id === id ? response : t));
                toast.success(`Teacher ${updatedTeacher.firstName} ${updatedTeacher.lastName} edited successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            })
    };

    const removeTeacher = async (
        id: number
    ) => {
        setLoading(true);
        setError(null);
        return await deleteTeacher(id)
            .then(() => {
                setFilteredTeachers((prevTeacher) => prevTeacher.filter(t => t.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const searchTeacherQuery = async (
        firstName?: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await searchTeacher(firstName)
            .then((response) => {
                setFilteredTeachers(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleValues = {
        searchTeacherQuery,
        getTeacherFullNameById,
        fetchTeacherById,
        createNewTeacher,
        removeTeacher,
        editTeacher,
        teachers,
        selectedTeacher,
        error,
        loading,
        overAllTeachers,
        filteredTeachers
    };

    return (
        <TeacherContext.Provider value={handleValues}>
            {children}
        </TeacherContext.Provider>
    )
}