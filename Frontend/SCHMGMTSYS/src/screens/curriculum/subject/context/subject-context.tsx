import { createContext, useCallback, useEffect, useState } from "react";
import { SubjectContextTypes } from "../types/subject-types";
import { SubjectProps } from "./props/subject-props";
import { SubjectData } from "../data/subject";
import { createSubject, deleteSubject, getAllCountSubject, getAllSubject, getSubjectById, searchSubject, updateSubject } from "../../../../services/subject/subject-service";
import { toast } from "react-toastify";
import { handleError } from "../../../../configs/error-handling";

export const SubjectContext = createContext<SubjectContextTypes | null>(null);

export const SubjectProvider: React.FC<SubjectProps> = ({ children }) => {

    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [selectedSubjects, setSelectedSubjects] = useState<SubjectData | null>(null);
    const [filteredSubjects, setFilteredSubjects] = useState<SubjectData[]>([]);
    const [overAllSubject, setOverAllSubject] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAllSubject()
            .then(async (response) => {
                setSubjects(response);  
                setFilteredSubjects(response);
                return await getAllCountSubject();
            }).then((overAllSubjectResponse) => {
                setOverAllSubject(overAllSubjectResponse);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const fetchSubjectById = useCallback(async (
        subjectId: number
    ) => {
        return await getSubjectById(subjectId)
        .then((response) => {
            setSelectedSubjects(response);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        });
    }, []);

    const createNewSubject = async (
        values: Omit<SubjectData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...values,
            teacher: {
                id: values.teacher_id
            }
        };
        return await createSubject(formattedValues)
            .then((response) => {
                const addedSubject = [...subjects, response];
                setSubjects(addedSubject);
                setFilteredSubjects(addedSubject);
                toast.success(`Subject ${values.name} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const editSubject = async (
        id: number, 
        updatedSubject: Omit<SubjectData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...updatedSubject,
            teacher: {
                id: updatedSubject.teacher_id
            }
        };
        return await updateSubject(id, formattedValues)
            .then((response) => {
                const updatedSubjectList = subjects.map(s => s.id === id ? response : s)
                setSubjects(updatedSubjectList);
                setFilteredSubjects(updatedSubjectList);
                toast.success(`Subject ${updatedSubject.name} updated successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };
    
    const removeSubject = async (
        id: number
    ) => {
        setLoading(true);
        setError(null);
        return await deleteSubject(id)
            .then(() => {
                setSubjects((prevSubject) => prevSubject.filter(s => s.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const searchSubjectQuery = async (
        name?: string
    ) => {
        setLoading(true);
        setError(null);
        return await searchSubject(name)
            .then((response) => {
                setFilteredSubjects(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleValue = {
        searchSubjectQuery,
        removeSubject,
        editSubject,
        fetchSubjectById,
        createNewSubject,
        selectedSubjects,
        subjects,
        loading,
        error,
        overAllSubject,
        filteredSubjects
    };

    return (
        <SubjectContext.Provider value={handleValue}>
            {children}
        </SubjectContext.Provider>
    )
};