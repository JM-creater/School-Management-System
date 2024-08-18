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
            return await getAllCountParent();
        }).then((overAllParentResponse) => {
            setOverAllParent(overAllParentResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const fetchParentById = useCallback(async (
        parentId: number
    ) => {
        return await getParentById(parentId)
            .then((response) => {
                setSelectedParent(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            });
    }, []);
    
    const createNewParents = async (
        parent: Omit<ParentData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        return await createParent(parent)
            .then((response) => {
                const addedParents = [...parents, response];
                setParents(addedParents);
                setFilteredParents(addedParents);
                toast.success(`Parent ${parent.firstName} ${parent.lastName} added successfully`);
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const editParent = async (
        id: number, 
        updatedParent: Omit<ParentData, 'id'>
    ) => {
        setLoading(true);
        setError(null);
        return await updateParent(id, updatedParent)
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

    const removeParent = async (
        id: number
    ) => {
        setLoading(true);
        setError(null);
        return await deleteParent(id)
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

    const searchParentQuery = async (
        name?: string
    ) => {
        setLoading(true);
        setError(null);
        return await searchParent(name)
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