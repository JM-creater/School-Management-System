import React, { createContext, useCallback, useEffect, useState } from "react";
import { ParentContextType, ParentProps } from "./props/parent-props";
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

    const rowClick = async (
        record: ParentData
    ): Promise<void> => {
        setSelectedParent(record);
        await fetchParentById(record.id as number);
    };

    const fetchParentById = useCallback(async <TNumber extends number>(
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
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const editParent = async <
        TNumber extends number, 
        TUpdate extends Omit<ParentData, 'id'>
    >(
        id: TNumber, 
        updatedParent: TUpdate
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        return await updateParent<TNumber, TUpdate>(id, updatedParent)
            .then((response) => {
                const editedParents = parents.map((parent) => 
                    parent.id === id 
                               ? response 
                               : parent
                            );
                setParents(editedParents);
                setFilteredParents(editedParents)
            }).catch((error) => {
                const errorMessage = handleError(error);
                setError(errorMessage);
            }).finally(() => {
                setLoading(false);
            });
    };

    const removeParent = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
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

    const searchParentQuery = async <
        TString extends string
    >(
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
    
    return (
        <ParentContext.Provider 
            value={{
                rowClick,
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
            }}
        >
            {children}
        </ParentContext.Provider>
    )
};