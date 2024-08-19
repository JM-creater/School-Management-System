import { createContext, useCallback, useEffect, useState } from "react";
import { StudentContextTypes } from "../types/student-types";
import { StudentProps } from "./props/student-props";
import { StudentData } from "../data/student";
import { 
    createStudent, 
    deleteStudent, 
    getAllCountStudent, 
    getAllStudent, 
    getCountAbsent, 
    getCountLate, 
    getCountPresent, 
    getStudentById, 
    searchStudent, 
    updateStudent 
} from "../../../services/student/student-service";
import { toast } from "react-toastify";
import { handleError } from "../../../configs/error-handling";

export const StudentContext = createContext<StudentContextTypes | null>(null);

export const StudentProvider: React.FC<StudentProps> = ({ children }) => {

    const [students, setStudents] = useState<StudentData[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<StudentData | null>(null);
    const [overAllStudent, setOverAllStudents] = useState<number>(0);
    const [countPresent, setCountPresent] = useState<number>(0);
    const [countLate, setCountLate] = useState<number>(0);
    const [countAbsent, setCountAbsent] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllStudent<string>()
        .then(async (response) => {
            setStudents(response);
            setFilteredStudents(response);
            return await getAllCountStudent<string>()
        }).then(async (overAllStudentResponse) => {
            setOverAllStudents(overAllStudentResponse);
            return await getCountPresent<string>();
        }).then(async (presentResponse) => {
            setCountPresent(presentResponse);
            return await getCountLate<string>();
        }).then(async (lateResponse) => {
            setCountLate(lateResponse);
            return await getCountAbsent<string>();
        }).then((absentResponse) => {
            setCountAbsent(absentResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        }); 
    }, []);

    const fetchStudentById = useCallback(async <TNumber extends number | undefined>(
        studentId: TNumber
    ): Promise<void> => {
        return await getStudentById<TNumber>(studentId)
            .then((response) => {
                setSelectedStudents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

    /**
     * Fetches a student by their ID and updates the selected student state.
     *
     * @param {number | undefined} studentId - The ID of the student to fetch. This parameter is optional.
     * @return {Promise<void>} A promise that resolves when the student data is fetched and the state is updated.
     */
    const createNewStudent = async <TValues extends Omit<StudentData, 'id'>>(
        values: TValues
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...values,
            parent: {
                id: values.parent_id
            },
            classroom: {
                id: values.classroom_id
            }
        };
        return await createStudent(formattedValues)
            .then((response) => {
                const addStudents = [...students, response];
                setStudents(addStudents);
                setFilteredStudents(addStudents);
                toast.success(`Student ${values.firstName} ${values.lastName} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Edits an existing student's information by their ID.
     *
     * @param {number | undefined} id - The ID of the student to edit. This parameter is optional.
     * @param {Omit<StudentData, 'id'>} updatedStudent - The updated student data excluding the ID.
     * @return {Promise<void>} A promise that resolves when the student's data has been successfully updated.
     */
    const editStudent = async <TNumber extends number | undefined>(
        id: TNumber, 
        updatedStudent: Omit<StudentData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...updatedStudent,
            parent: {
                id: updatedStudent.parent_id
            },
            classroom: {
                id: updatedStudent.classroom_id
            }
        } as number extends TNumber ? Omit<StudentData, 'id'> : StudentData;
        return await updateStudent<TNumber>(id, formattedValues)
            .then((response) => {
                const editedStudent = students.map(s => s.id === id ? response : s)
                setStudents(editedStudent);
                setFilteredStudents(editedStudent);
                toast.success(`Student ${updatedStudent.firstName} ${updatedStudent.lastName} updated successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Removes a student from the system by their ID.
     *
     * @param {number | undefined} id - The ID of the student to be removed. This parameter is optional.
     * @return {Promise<void>} A promise that resolves when the student has been successfully removed.
     */
    const removeStudent = async <TNumber extends number | undefined>(
        id: TNumber
    ) => {
        setLoading(true);
        setError(null);
        return await deleteStudent<TNumber>(id)
            .then(() => {
                setStudents((prevStudents) => prevStudents.filter(t => t.id !== id));
                setFilteredStudents((prevStudents) => prevStudents.filter(t => t.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Searches for students based on the provided name and updates the filtered student list.
     *
     * @param {string | undefined} name - The name to search for. This parameter is optional.
     * @return {Promise<void>} A promise that resolves when the search operation completes.
     */
    const searchStudentQuery = async <TString extends string | undefined>(
        name?: TString
    ) => {
        setLoading(true);
        setError(null);
        return await searchStudent<TString>(name)
            .then((response) => {
                setFilteredStudents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleValue = {
        countPresent,
        countLate,
        countAbsent,
        overAllStudent,
        students,
        filteredStudents,
        selectedStudents,
        loading,
        error,
        fetchStudentById,
        createNewStudent,
        editStudent,
        removeStudent,
        searchStudentQuery
    };

    return (
        <StudentContext.Provider value={handleValue}>
            {children}
        </StudentContext.Provider>
    )
}