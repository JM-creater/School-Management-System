import React, { createContext, useCallback, useEffect, useState } from "react";
import { ParentContextType } from "../types/parent-types";
import { ParentProps } from "./props/parent-props";
import { ParentData } from "../data/parents";
import { 
    createParent, 
    deleteParent, 
    getAllCountParent, 
    getAllParent, 
    getParentById, 
    searchParent, 
    updateParent 
} from "../../../services/parent/parent-service";
import { toast } from "react-toastify";
import { handleError } from "../../../configs/error-handling";

export const ParentContext = createContext<ParentContextType | null>(null);

export const ParentProvider: React.FC<ParentProps> = ({ children }) => {
    
    const [parents, setParents] = useState<ParentData[]>([]);
    const [filteredParents, setFilteredParents] = useState<ParentData[]>([]);
    const [selectedParent, setSelectedParent] = useState<ParentData | null>(null);
    const [overAllParent, setOverAllParent] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllParent().then(async (response) => {
            setParents(response);
            setFilteredParents(response);
            return await getAllCountParent<string>();
        }).then((overAllParentResponse) => {
            setOverAllParent(overAllParentResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
     * Fetches a parent by their ID and updates the selected parent state.
     *
     * @param {TNumber} parentId - The ID of the parent to fetch.
     * @return {Promise<void>} - A promise that resolves when the parent data is fetched and state is updated.
    */
    const fetchParentById = useCallback(async <TNumber extends number | undefined>(
        parentId: TNumber
    ): Promise<void> => {
        return await getParentById<TNumber>(parentId)
            .then((response) => {
                setSelectedParent(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);
    
    /**
     * Creates a new parent and updates the state with the newly created parent.
     * 
     * @param values - The parent data to be created. Excludes the 'id' field, which is typically auto-generated by the backend.
     * @template TValues - Type representing the parent data, excluding the 'id' field.
     */
    const createNewParents = async <TValues extends Omit<ParentData, 'id'>>(
        values: TValues
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await createParent<TValues>(values)
            .then((response) => {
                const addedParents = [...parents, response];
                setParents(addedParents);
                setFilteredParents(addedParents);
                toast.success(`Parent ${values.firstName} ${values.lastName} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Updates a parent's information on the server and refreshes the state with the updated data.
     *
     * @param {TNumber} id - The ID of the parent to update. Can be a number or undefined.
     * @param {Omit<ParentData, 'id'>} updatedParent - The updated parent data excluding the ID.
     * @return {Promise<void>} - A promise that resolves when the update operation is complete. Updates the state and displays a success message.
    */
    const editParent = async <TNumber extends number | undefined>(
        id: TNumber, 
        updatedParent: Omit<ParentData, 'id'>
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateParent<TNumber>(id, updatedParent)
            .then((response) => {
                const editedParents = parents.map(parent => parent.id === id ? response : parent);
                setParents(editedParents);
                setFilteredParents(editedParents)
                toast.success(`Parent ${updatedParent.firstName} ${updatedParent.lastName} updated successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Removes a parent from the server and updates the state to reflect the change.
     *
     * @param {TNumber} id - The ID of the parent to remove. Can be a number or undefined.
     * @return {Promise<void>} - A promise that resolves when the removal operation is complete. Updates the state and handles any errors.
    */
    const removeParent = async <TNumber extends number | undefined>(
        id: TNumber
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await deleteParent<TNumber>(id)
            .then(() => {
                setParents((prevParent) => prevParent.filter(p => p.id !== id));
                setFilteredParents((prevParent) => prevParent.filter(p => p.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    /**
     * Searches for parents based on the provided name and updates the filtered parent list.
     *
     * @param {TString} name - The name of the parent to search for. Can be a string or undefined.
     * @return {Promise<void>} - A promise that resolves when the search operation is complete. Updates the filtered parent list and handles any errors.
    */
    const searchParentQuery = async <TString extends string | undefined>(
        name?: TString
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await searchParent<TString>(name)
            .then((response) => {
                setFilteredParents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleValues = {
        searchParentQuery,
        editParent,
        removeParent,
        fetchParentById,
        createNewParents,
        loading,
        error,
        parents,
        filteredParents,
        selectedParent,
        overAllParent
    };
    
    return (
        <ParentContext.Provider value={handleValues}>
            {children}
        </ParentContext.Provider>
    )
};