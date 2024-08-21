import { createContext, useCallback, useEffect, useState } from "react";
import { SubjectContextTypes } from "../types/subject-types";
import { SubjectProps } from "./props/subject-props";
import { SubjectData } from "../data/subject";
import { 
    createSubject, 
    deleteSubject, 
    getAllCountSubject, 
    getAllSubject, 
    getSubjectById, 
    searchSubject, 
    updateSubject 
} from "../../../../services/subject/subject-service";
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
    
    /**
     * Fetches all subjects from the server and updates the state when the component mounts.
     * It also fetches the total count of subjects and updates the state.
     * This function is called only once when the component mounts.
     *
     * @return {void} This function does not return anything.
    */
    useEffect(() => {
        setLoading(true);
        setError(null);
        getAllSubject<string>()
        getAllSubject()
            .then(async (response) => {
                setSubjects(response);  
                setFilteredSubjects(response);
                return await getAllCountSubject<string>();
            }).then((overAllSubjectResponse) => {
                setOverAllSubject(overAllSubjectResponse);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    }, []);


    const rowClick = async (
        record: SubjectData
    ): Promise<void> => {
        setSelectedSubjects(record);
        await fetchSubjectById(record.id as number);
    };

    /**
     * Fetches a subject by its ID from the server and updates the state.
     *
     * @param {T} subjectId - The ID of the subject to fetch.
     * @return {Promise<void>} A promise that resolves when the subject is successfully fetched.
     */
    const fetchSubjectById = useCallback(async <TNumber extends number>(
        subjectId: TNumber
    ): Promise<void> => {
        return await getSubjectById<TNumber>(subjectId)
            .then((response) => {
                setSelectedSubjects(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

    /**
     * Creates a new subject with the provided values and updates the list of subjects.
     *
     * @param {Omit<SubjectData, 'id'>} values - The values to create the new subject with.
     * @return {Promise<void>} A promise that resolves when the subject is successfully created.
    */
    const createNewSubject = async <TSubjectData extends Omit<SubjectData, 'id'>>(
        values: TSubjectData
    ): Promise<void> => {
        setError(null);
    
        const formattedValues = {
            ...values,
            teacher: {
                id: values.teacher_id
            }
        } as TSubjectData;
    
        return await createSubject<TSubjectData>(formattedValues)
            .then((response) => {
                const addedSubject = [...subjects, response];
                setSubjects(addedSubject);
                setFilteredSubjects(addedSubject);
                toast.success(`Subject ${values.name} added successfully`);
            })
            .catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    /**
     * Edits a subject by sending a PUT request to the subject update URL.
     *
     * @param {number} id - The ID of the subject to be updated.
     * @param {Omit<SubjectData, 'id'>} updatedSubject - The updated subject data.
     * @return {Promise<void>} A promise that resolves when the subject is successfully updated.
    */
    const editSubject = async <TNumber extends number>(
        id: TNumber, 
        updatedSubject: Omit<SubjectData, 'id'>
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        const formattedValues = {
            ...updatedSubject,
            teacher: {
                id: updatedSubject.teacher_id
            }
        } as number extends TNumber ? Omit<SubjectData, 'id'> : SubjectData;
        return await updateSubject<TNumber>(id, formattedValues)
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
    
    /**
    * Removes a subject by sending a DELETE request to the subject delete URL.
    *
    * @param {number} id - The ID of the subject to be removed.
    * @return {Promise<void>} A promise that resolves when the subject is successfully removed.
    */
   const removeSubject = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        return await deleteSubject<TNumber>(id)
            .then(() => {
                setSubjects((prevSubjects) => prevSubjects.filter(s => s.id !== id));
                setFilteredSubjects((prevSubjects) => prevSubjects.filter(s => s.id !== id));
                toast.success(`Subject with ID ${id} removed successfully`);
            })
            .catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Searches for a subject by name and updates the filtered subjects list.
     *
     * @param {string | undefined} name - The name of the subject to search for.
     * @return {Promise<void>} A promise that resolves when the search is complete.
     */
    const searchSubjectQuery = async <TString extends string | undefined>(
        name?: TString
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        return await searchSubject<TString>(name)
            .then((response) => {
                setFilteredSubjects(response);
            })
            .catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleValue = {
        searchSubjectQuery,
        removeSubject,
        editSubject,
        fetchSubjectById,
        createNewSubject,
        rowClick,
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