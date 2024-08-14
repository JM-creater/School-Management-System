import { createContext, useCallback, useEffect, useState } from "react";
import { ClassContextTypes } from "../types/class-types";
import { ClassProps } from "./props/class-props";
import { ClassData } from "../data/class";
import { createClass, deleteClass, getAllClass, getClassById, updateClass } from "../../../../services/class/class-service";
import { toast } from "react-toastify";
import { FormProps } from "antd";

export const ClassContext = createContext<ClassContextTypes | null>(null);

export const ClassProvider: React.FC<ClassProps> = ({ children }) => {
    
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedClasses, setSelectedClasses] = useState<ClassData | null>(null);

    const onFinishFailed: FormProps<ClassData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const response = await getAllClass();
                setClasses(response);
            } catch (error) {
                console.log(error);
                setError('Failed to catch classes');
            } finally {
                setLoading(false);
            }
        }

        fetchClasses();
    }, []);

    const fetchClassById = useCallback(async (classId: number) => {
        try {
            const response = await getClassById(classId);
            setSelectedClasses(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch class by Id');
        }
    }, []);

    const createNewClass = async (values: Omit<ClassData, 'id'>) => {
        setLoading(true);
        try {
            const response = await createClass(values);
            setClasses([...classes, response]);
            toast.success("Class added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add class'); 
        } finally {
            setLoading(false);
        }
    };

    const editClass = async (id: number, updatedClasses: Omit<ClassData, 'id'>) => {
        setLoading(true);
        try {
            const response = await updateClass(id, updatedClasses);
            setClasses(classes.map(c => c.id === id ? response : c));
            toast.success("Class updated successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to update class'); 
        } finally {
            setLoading(false);
        }
    };

    const removeClass = async (id: number) => {
        setLoading(true);
        try {
            await deleteClass(id);
            setClasses((prevClass) => prevClass.filter(t => t.id !== id));
        } catch (error) {
            console.log(error);
            setError('Failed to delete class');
        } finally {
            setLoading(false);
        }
    };
    
    const handleValues = {
        selectedClasses,
        loading,
        error,
        classes,
        onFinishFailed,
        createNewClass,
        fetchClassById,
        removeClass,
        editClass
    };

    return (
        <ClassContext.Provider value={handleValues}>
            {children}
        </ClassContext.Provider>
    )
} 