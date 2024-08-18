import { createContext, useCallback, useEffect, useState } from "react";
import { ClassContextTypes } from "../types/class-types";
import { ClassProps } from "./props/class-props";
import { ClassData } from "../data/class";
import { 
    createClass, 
    deleteClass, 
    getAllClass, 
    getAllCountClass, 
    getClassById, 
    searchClass, 
    updateClass 
} from "../../../../services/class/class-service";
import { toast } from "react-toastify";
import { handleError } from "../../../../configs/error-handling";

export const ClassContext = createContext<ClassContextTypes | null>(null);

export const ClassProvider: React.FC<ClassProps> = ({ children }) => {
    
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<ClassData | null>(null);
    const [overAllClass, setOverAllClass] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllClass().then(async (response) => {
            setClasses(response);
            setFilteredClasses(response);
            return await getAllCountClass();
        }).then((overAllClassResponse) => {
            setOverAllClass(overAllClassResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const getClassNameById = (
        classId: number, 
        classData: ClassData[]
    ): string => {
        const classIndex = classData.find(t => t.id === classId);
        return classIndex ? classIndex.name : 'No Class Found';
    };

    const fetchClassById = useCallback(async (
        classId: number
    ) => {
        return await getClassById(classId)
            .then((response) => {
                setSelectedClasses(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

    const createNewClass = async (
        values: Omit<ClassData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        return await createClass(values)
            .then((response) => {
                const addedClasses = [...classes, response];
                setClasses(addedClasses);
                setFilteredClasses(addedClasses); 
                toast.success(`Class ${values.name} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const editClass = async (
        id: number, 
        updatedClasses: Omit<ClassData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        return await updateClass(id, updatedClasses)
            .then((response) => {
                const updatedClassList = classes.map(c => c.id === id ? response : c);
                setClasses(updatedClassList);
                setFilteredClasses(updatedClassList);
                toast.success("Class updated successfully");
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const removeClass = async (
        id: number
    ) => {
        setLoading(true);
        setError(null);
        return await deleteClass(id)
            .then(() => {
                setClasses((prevClass) => prevClass.filter(t => t.id !== id));
                setFilteredClasses((prevClass) => prevClass.filter(t => t.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const searchClassQuery = async (
        name?: string
    ) => {
        setLoading(true);
        setError(null);
        return await searchClass(name)
            .then((response) => {
                setFilteredClasses(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };
    
    const handleValues = {
        overAllClass,
        selectedClasses,
        loading,
        error,
        classes,
        filteredClasses,
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
};