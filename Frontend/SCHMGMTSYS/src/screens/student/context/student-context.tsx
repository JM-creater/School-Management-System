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
        getAllStudent()
        .then(async (response) => {
            setStudents(response);
            setFilteredStudents(response);
            return await getAllCountStudent()
        }).then(async (overAllStudentResponse) => {
            setOverAllStudents(overAllStudentResponse);
            return await getCountPresent();
        }).then(async (presentResponse) => {
            setCountPresent(presentResponse);
            return await getCountLate();
        }).then(async (lateResponse) => {
            setCountLate(lateResponse);
            return await getCountAbsent();
        }).then((absentResponse) => {
            setCountAbsent(absentResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        }); 
    }, []);

    const rowClick = async <T extends StudentData>(
        record: T
    ): Promise<void> => {
        setSelectedStudents(record);
        await fetchStudentById(record.id as number);
    };

    const fetchStudentById = useCallback(async <TNumber extends number>(
        studentId: TNumber
    ): Promise<void> => {
        return await getStudentById(studentId)
            .then((response) => {
                setSelectedStudents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

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

    const editStudent = async <TNumber extends number>(
        id: TNumber, 
        updatedStudent: Omit<StudentData, 'id'>
    ): Promise<void> => {
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
        return await updateStudent(id, formattedValues)
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

    const removeStudent = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await deleteStudent(id)
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

    const searchStudentQuery = async <TString extends string>(
        name?: TString
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await searchStudent(name)
            .then((response) => {
                setFilteredStudents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <StudentContext.Provider 
            value={{
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
                searchStudentQuery,
                rowClick
            }}
        >
            {children}
        </StudentContext.Provider>
    )
}