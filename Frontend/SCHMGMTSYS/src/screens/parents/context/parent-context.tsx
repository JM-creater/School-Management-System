import React, { 
    createContext, 
    useCallback, 
    useEffect 
} from "react";
import { 
    createParent, 
    deleteParent, 
    getAllCountParent, 
    getAllParent, 
    getParentById, 
    searchParent, 
    updateParent 
} from "../../../services/parent/parent-service";
import { 
    IParentStoreContextType,
    rootStore,
    useStore
} from "../../../stores";
import { observer } from "mobx-react-lite";
import { ParentData } from "../../../configs/interface";
import { handleError } from "../../../configs/error-handling";
import { ParentContextProps, ParentProps } from "../../../configs/props";

export const ParentContext = createContext<IParentStoreContextType>(rootStore.parentStore);

export const ParentProvider: React.FC<ParentProps> = observer(({ children }) => {

    const { parentStore } = useStore();

    useEffect(() => {
        parentStore.setLoading(true);
        getAllParent().then(async (response) => {
            console.log(response);
            parentStore.setParents(response);
            parentStore.setFilteredParents(response);
            return await getAllCountParent();
        }).then((overAllParentResponse) => {
            parentStore.setOverAllParent(overAllParentResponse);
        }).catch((error) => {
            console.error("Error fetching parents: ", error);
            const errorMessage = handleError(error);
            parentStore.setError(errorMessage);
        }).finally(() => {
            parentStore.setLoading(false);
        });
    }, [parentStore]);

    const rowClick = async (
        record: ParentData
    ): Promise<void> => {
        parentStore.setSelectedParent(record);
        await fetchParentById(record.id as number);
    };

    const fetchParentById = useCallback(async <TNumber extends number>(
        parentId: TNumber
    ): Promise<void> => {
        return await getParentById<TNumber>(parentId)
            .then((response) => {
                parentStore.setSelectedParent(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                parentStore.setError(errorMessage);
            });
    }, [parentStore]);
    
    const createNewParents = async <TValues extends Omit<ParentData, 'id'>>(
        values: TValues
    ): Promise<void> => {
        parentStore.setLoading(true);
        parentStore.setError(null);
        return await createParent<TValues>(values)
            .then((response) => {
                const addedParents = [...parentStore.parents, response];
                parentStore.setParents(addedParents);
                parentStore.setFilteredParents(addedParents);
            }).catch((error) => {
                const errorMessage = handleError(error);
                parentStore.setError(errorMessage);
            }).finally(() => {
                parentStore.setLoading(false);
            });
    };

    const editParent = async <
        TNumber extends number, 
        TUpdate extends Omit<ParentData, 'id'>
    >(
        id: TNumber, 
        updatedParent: TUpdate
    ): Promise<void> => {
        parentStore.setLoading(true);
        parentStore.setError(null);
        return await updateParent<TNumber, TUpdate>(id, updatedParent)
            .then((response) => {
                const editedParents = parentStore.parents.map((parent: ParentData) => 
                    parent.id === id 
                               ? response 
                               : parent
                            );
                parentStore.setParents(editedParents);
                parentStore.setFilteredParents(editedParents);
            }).catch((error) => {
                const errorMessage = handleError(error);
                parentStore.setError(errorMessage);
            }).finally(() => {
                parentStore.setLoading(false);
            });
    };

    const removeParent = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        parentStore.setLoading(true);
        parentStore.setError(null);
        return await deleteParent(id)
            .then(() => {
                parentStore.setParents(
                    parentStore.parents.filter((p: ParentData) => p.id !== id)
                );
                parentStore.setFilteredParents(
                    parentStore.filteredParents.filter((p: ParentData) => p.id !== id)
                );
            }).catch((error) => {
                const errorMessage = handleError(error);
                parentStore.setError(errorMessage);
            }).finally(() => {
                parentStore.setLoading(false);
            });
    };

    const searchParentQuery = async <
        TString extends string
    >(
        name?: TString
    ): Promise<void> => {
        parentStore.setLoading(true);
        parentStore.setError(null);
        return await searchParent<TString>(name)
            .then((response) => {
                parentStore.setFilteredParents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                parentStore.setError(errorMessage);
            }).finally(() => {
                parentStore.setLoading(false);
            });
    };
    
    return (
        <ParentContext.Provider 
            value={{    
                ...rootStore.parentStore,
                rowClick,
                searchParentQuery,
                createNewParents,
                editParent,
                removeParent,
                fetchParentById,
            } as ParentContextProps}
        >
            {children}
        </ParentContext.Provider>
    )
});