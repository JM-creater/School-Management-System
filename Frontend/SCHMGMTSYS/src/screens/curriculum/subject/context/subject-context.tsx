import { createContext, useCallback, useEffect, useState } from "react";
import { SubjectContextTypes } from "../types/subject-types";
import { SubjectProps } from "./props/subject-props";
import { SubjectData } from "../data/subject";
import { createSubject, deleteSubject, getAllSubject, getSubjectById, updateSubject } from "../../../../services/subject/subject-service";
import { toast } from "react-toastify";
import { FormProps } from "antd";

export const SubjectContext = createContext<SubjectContextTypes | null>(null);

export const SubjectProvider: React.FC<SubjectProps> = ({ children }) => {

    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<SubjectData | null>(null);

    const onFinishFailed: FormProps<SubjectData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await getAllSubject();
                setSubjects(response);
            } catch (error) {
                console.log(error);
                setError('Failed to catch subjects');
            } finally {
                setLoading(false);
            }
        }

        fetchSubjects();
    }, []);

    const fetchSubjectById = useCallback(async (subjectId: number) => {
        try {
            const response = await getSubjectById(subjectId);
            setSelectedSubjects(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch subject by Id');
        }
    }, []);

    const createNewSubject = async (values: Omit<SubjectData, 'id'>) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                teacher: {
                    id: values.teacher_id
                }
            };
            const response = await createSubject(formattedValues);
            setSubjects([...subjects, response]);
            toast.success("Subject added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add subjects'); 
        } finally {
            setLoading(false);
        }
    };

    const editSubject = async (id: number, updatedSubject: Omit<SubjectData, 'id'>) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...updatedSubject,
                teacher: {
                    id: updatedSubject.teacher_id
                }
            };
            const response = await updateSubject(id, formattedValues);
            setSubjects(subjects.map(s => s.id === id ? response : s));
            toast.success("Subject updated successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to update parent');
        } finally {
            setLoading(false);
        }
    };
    
    const removeSubject = async (id: number) => {
        setLoading(true);
        try {
            await deleteSubject(id);
            setSubjects((prevSubject) => prevSubject.filter(s => s.id !== id));
        } catch (error) {
            console.log(error);
            setError('Failed to delete subject');
        } finally {
            setLoading(false);
        }
    };

    const handleValue = {
        removeSubject,
        editSubject,
        fetchSubjectById,
        createNewSubject,
        onFinishFailed,
        selectedSubjects,
        subjects,
        loading,
        error
    };

    return (
        <SubjectContext.Provider value={handleValue}>
            {children}
        </SubjectContext.Provider>
    )
}