import { createContext, useCallback, useEffect, useState } from "react";
import { ClassContextTypes } from "../types/class-types";
import { ClassProps } from "./props/class-props";
import { ClassData } from "../data/class";
import { createClass, deleteClass, getAllClass, getAllCountClass, getClassById, searchClass, updateClass } from "../../../../services/class/class-service";
import { toast } from "react-toastify";
import { FormProps } from "antd";

export const ClassContext = createContext<ClassContextTypes | null>(null);

export const ClassProvider: React.FC<ClassProps> = ({ children }) => {
    
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [overAllClass, setOverAllClass] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedClasses, setSelectedClasses] = useState<ClassData | null>(null);
    const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);

    const onFinishFailed: FormProps<ClassData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const response = await getAllClass();
                setClasses(response);
                setFilteredClasses(response);

                const overAllClassResponse = await getAllCountClass();
                setOverAllClass(overAllClassResponse);
            } catch (error) {
                console.log(error);
                setError('Failed to catch classes');
            } finally {
                setLoading(false);
            }
        }

        fetchClasses();
    }, []);

    const getClassNameById = (classId: number, classData: ClassData[]): string => {
        const classIndex = classData.find(t => t.id === classId);
        return classIndex ? classIndex.name : 'No Class Found';
    };

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
            setClasses([...filteredClasses, response]);
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

    const searchClassQuery = async (searchQuery: string | null | undefined) => {
        if (searchQuery === null || searchQuery === undefined) {
            setFilteredClasses([]);
            return;
        }
    
        const trimmedQuery = searchQuery.trim();
    
        if (!trimmedQuery) {
            setFilteredClasses(classes);
            return;
        }
    
        const controller = new AbortController();
        const { signal } = controller;
    
        try {
            const response = await searchClass(searchQuery, signal);
            if (Array.isArray(response)) {
                setFilteredClasses(response);
            } else {
                setFilteredClasses([]);
            }
             
        } catch (error) {
            console.log(error);
            setError('Failed to search class');
            setFilteredClasses([]); 
        }
    };
    
    const handleValues = {
        overAllClass,
        selectedClasses,
        loading,
        error,
        classes,
        filteredClasses,
        onFinishFailed,
        createNewClass,
        fetchClassById,
        removeClass,
        editClass,
        getClassNameById,
        searchClassQuery
    };

    return (
        <ClassContext.Provider value={handleValues}>
            {children}
        </ClassContext.Provider>
    )
} 