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
        getAllClass()
        getAllClass()
        .then(async (response) => {
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

    const rowClick = async <T extends ClassData>(
        record: T
    ): Promise<void> => {
        setSelectedClasses(record);
        await fetchClassById(record.id as number);
    };

    const getClassNameById = <TClassData extends ClassData>(
        id: number, 
        classData: TClassData[]
    ): string => {
        const classIndex = classData.find(t => t.id === id);
        return classIndex ? classIndex.name : 'No Class Found';
    };

    const fetchClassById = useCallback(async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        return await getClassById(id)
            .then((response) => {
                setSelectedClasses(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

    const createNewClass = async <TClassData extends Omit<ClassData, 'id'>>(
        values: TClassData
    ): Promise<void> => {
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

    const editClass = async <TNumber extends number>(
        id: TNumber,
        updatedClasses: Omit<ClassData, 'id'>
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateClass(id, updatedClasses)
            .then((response) => {
                const updatedClassList = classes.map(c => c.id === id ? response : c);
                setClasses(updatedClassList);
                setFilteredClasses(updatedClassList);
                toast.success(`Class ${updatedClasses.name} updated successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const removeClass = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
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

    const searchClassQuery = async <TString extends string>(
        name?: TString
    ): Promise<void> => {
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
    
    return (
        <ClassContext.Provider 
            value={{
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
                searchClassQuery,
                rowClick
            }}
        >
            {children}
        </ClassContext.Provider>
    )
};