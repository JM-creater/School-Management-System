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

    /**
     * Fetches all classes from the server and updates the state when the component mounts.
     * It also fetches the total count of classes and updates the state.
     * This function is called only once when the component mounts.
     *
     * @return {void} This function does not return anything.
    */
    useEffect(() => {
        setLoading(true);
        getAllClass<string>()
        getAllClass()
        .then(async (response) => {
            setClasses(response);
            setFilteredClasses(response);
            return await getAllCountClass<number>();
        }).then((overAllClassResponse) => {
            setOverAllClass(overAllClassResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
     * Handles the row click event in a table and fetches detailed information for the selected class.
     *
     * @param {T} record - The class data record that was clicked. The record should match the `ClassData` interface.
     * @return {Promise<void>} - A promise that resolves when the detailed class information has been fetched.
     * 
     * @template T - The type extending `ClassData`, representing the clicked class record.
     * 
     * @throws Will throw an error if fetching class details by ID fails. The error will be managed within `fetchClassById`.
    */
    const rowClick = async <T extends ClassData>(
        record: T
    ): Promise<void> => {
        setSelectedClasses(record);
        await fetchClassById(record.id as number);
    };

    /**
     * Retrieves the name of a class by its ID from a list of classes.
     *
     * @param {number} classId - The ID of the class to find.
     * @param {ClassData[]} classData - The list of classes to search in.
     * @return {string} The name of the class if found, 'No Class Found' otherwise.
     */
    const getClassNameById = <TClassData extends ClassData>(
        classId: number, 
        classData: TClassData[]
    ): string => {
        const classIndex = classData.find(t => t.id === classId);
        return classIndex ? classIndex.name : 'No Class Found';
    };

    /**
     * Fetches a class by its ID from the server and updates the state with the selected class.
     * This function is a callback that is called only once when the component mounts.
     *
     * @template TNumber - The type of the class ID.
     * @param {TNumber} classId - The ID of the class to fetch.
     * @return {Promise<void>} A promise that resolves when the class is successfully fetched.
     */
    const fetchClassById = useCallback(async <TNumber extends number>(
        classId: TNumber
    ): Promise<void> => {
        return await getClassById<TNumber>(classId)
            .then((response) => {
                setSelectedClasses(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);

    /**
     * Creates a new class with the provided values and updates the list of classes.
     *
     * @param {TClassData} values - The values to create the new class with.
     * @return {Promise<void>} A promise that resolves when the class is successfully created.
    */
    const createNewClass = async <TClassData extends Omit<ClassData, 'id'>>(
        values: TClassData
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await createClass<TClassData>(values)
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

    /**
     * Edits a class by sending a PUT request to the class update URL.
     *
     * @param {number} id - The ID of the class to be updated.
     * @param {Omit<ClassData, 'id'>} updatedClasses - The updated class data.
     * @return {Promise<void>} A promise that resolves when the class is successfully updated.
    */
    const editClass = async <TNumber extends number>(
        id: TNumber,
        updatedClasses: Omit<ClassData, 'id'>
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateClass<TNumber>(id, updatedClasses)
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

    /**
     * Removes a class by sending a DELETE request to the class delete URL.
     *
     * @param {number} id - The ID of the class to be removed.
     * @return {Promise<void>} A promise that resolves when the class is successfully removed.
     */
    const removeClass = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await deleteClass<TNumber>(id)
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

    /**
     * Asynchronously searches for classes based on the provided name and updates the filtered classes state.
     *
     * @param {TString | undefined} name - The name to search for. Can be of type string or undefined.
     * @return {Promise<void>} A promise that resolves when the search is complete.
    */
    const searchClassQuery = async <TString extends string | undefined>(
        name?: TString
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await searchClass<TString>(name)
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
        searchClassQuery,
        rowClick
    };

    return (
        <ClassContext.Provider value={handleValues}>
            {children}
        </ClassContext.Provider>
    )
};