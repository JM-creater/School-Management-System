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
        getAllTeacher<string>()
        .then((response) => {
            setTeachers(response);
            setFilteredTeachers(response);
            return getAllCountStudent<string>();
        }).then((overAllTeacherResponse) => {
            setOverAllTeachers(overAllTeacherResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const rowClick = async (
        record: TeacherData
    ): Promise<void> => {
        setSelectedTeacher(record);
        await fetchTeacherById(record.id as number);
    };

    /**
     * Retrieves the full name of a teacher by their ID.
     *
     * @param {number | undefined} teacherId - The ID of the teacher whose full name is to be retrieved.
     * @param {TeacherData[]} teachers - The list of teachers to search through.
     * @return {string} The full name of the teacher in the format "FirstName LastName", or 'No Teacher Assigned' if the teacher is not found.
    */
    const getTeacherFullNameById = <TNumber extends number | undefined>(
        teacherId: TNumber, 
        teachers: TeacherData[]
    ): string => {
        const teacher = teachers.find(t => t.id === teacherId);
        return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No Teacher Assigned';
    };

    /**
     * Fetches a teacher's data by their ID and updates the selected teacher state.
     *
     * @param {number | undefined} teacherId - The ID of the teacher to fetch.
     * @return {Promise<void>} A promise that resolves when the teacher data is fetched and the state is updated.
    */
    const fetchTeacherById = useCallback(async <TNumber extends number | undefined>(
        teacherId: TNumber
    ): Promise<void> => {
        getTeacherById<TNumber>(teacherId)
            .then((response) => {
                setSelectedTeacher(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            })
    }, []);

    /**
     * Creates a new teacher and updates the teachers list in the state.
     *
     * @param {Omit<TeacherData, 'id'>} teacher - The data of the teacher to be created.
     * @return {Promise<void>} A promise that resolves when the teacher is created and the state is updated.
    */
    const createNewTeacher = async <TTeacherData extends Omit<TeacherData, 'id'>>(
        teacher: TTeacherData
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...teacher,
            classroom: {
                id: teacher.classroom_id
            }
        } as TTeacherData;
        return await createTeacher<TTeacherData>(formattedValues)
            .then((response) => {
                setTeachers([...teachers, response]);
                setFilteredTeachers([...teachers, response]);
                toast.success(`Teacher ${teacher.firstName} ${teacher.lastName} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };
    
    /**
     * Edits an existing teacher's information and updates the teachers list in the state.
     *
     * @param {number | undefined} id - The ID of the teacher to be edited.
     * @param {Omit<TeacherData, 'id'>} updatedTeacher - The updated data of the teacher.
     * @return {Promise<void>} A promise that resolves when the teacher is updated and the state is updated.
    */
    const editTeacher = async <TNumber extends number | undefined>(
        id: TNumber, 
        updatedTeacher: Omit<TeacherData, 'id'>
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...updatedTeacher,
            classroom: {
                id: updatedTeacher.classroom_id
            }
        } as number extends TNumber ? Omit<TeacherData, 'id'> : TeacherData;
        return await updateTeacher<TNumber>(id, formattedValues)
            .then((response) => {
                setTeachers(teachers.map(t => t.id === id ? response : t));
                setFilteredTeachers(teachers.map(t => t.id === id ? response : t));
                toast.success(`Teacher ${updatedTeacher.firstName} ${updatedTeacher.lastName} edited successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            })
    };

    /**
     * Removes a teacher from the list based on their ID.
     *
     * @param {number | undefined} id - The ID of the teacher to be removed.
     * @return {Promise<void>} A promise that resolves when the teacher is removed and the state is updated.
     */
    const removeTeacher = async <TNumber extends number | undefined>(
        id: TNumber
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await deleteTeacher<TNumber>(id)
            .then(() => {
                setFilteredTeachers((prevTeacher) => prevTeacher.filter(t => t.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Searches for teachers by their first name and updates the filtered teachers list.
     *
     * @param {string | undefined} firstName - The first name of the teacher(s) to search for. This parameter is optional.
     * @return {Promise<void>} A promise that resolves when the search operation is complete and the state is updated.
     */
    const searchTeacherQuery = async <TString extends string | undefined>(
        firstName?: TString
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await searchTeacher<TString>(firstName)
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
        rowClick,
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