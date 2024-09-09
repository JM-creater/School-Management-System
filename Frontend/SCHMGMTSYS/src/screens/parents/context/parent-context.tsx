import React, { 
    createContext, 
    useCallback, 
    useContext, 
    useEffect 
} from "react";
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
import { observer } from "mobx-react-lite";
import { IParentStore, parentStore } from "../../../stores";

export const ParentContext = createContext<IParentStore>(parentStore);

export const ParentProvider: React.FC<ParentProps> = observer(({ children }) => {

    const rootStore = useContext(ParentContext);

    useEffect(() => {
        rootStore.setLoading(true);
        getAllParent().then(async (response) => {
            rootStore.setParents(response);
            rootStore.setFilteredParents(response);
            return await getAllCountParent();
        }).then((overAllParentResponse) => {
            rootStore.setOverAllParent(overAllParentResponse);
        }).catch((error) => {
            const errorMessage = handleError(error);
            rootStore.setError(errorMessage);
        }).finally(() => {
            rootStore.setLoading(false);
        });
    }, [rootStore]);

    const rowClick = async (
        record: ParentData
    ): Promise<void> => {
        rootStore.setSelectedParent(record);
        await fetchParentById(record.id as number);
    };

    const fetchParentById = useCallback(async <TNumber extends number>(
        parentId: TNumber
    ): Promise<void> => {
        return await getParentById<TNumber>(parentId)
            .then((response) => {
                rootStore.setSelectedParent(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                rootStore.setError(errorMessage);
            });
    }, [rootStore]);
    
    const createNewParents = async <TValues extends Omit<ParentData, 'id'>>(
        values: TValues
    ): Promise<void> => {
        rootStore.setLoading(true);
        rootStore.setError(null);
        return await createParent<TValues>(values)
            .then((response) => {
                const addedParents = [...rootStore.parents, response];
                rootStore.setParents(addedParents);
                rootStore.setFilteredParents(addedParents);
            }).catch((error) => {
                const errorMessage = handleError(error);
                rootStore.setError(errorMessage);
            }).finally(() => {
                rootStore.setLoading(false);
            });
    };

    const editParent = async <
        TNumber extends number, 
        TUpdate extends Omit<ParentData, 'id'>
    >(
        id: TNumber, 
        updatedParent: TUpdate
    ): Promise<void> => {
        rootStore.setLoading(true);
        rootStore.setError(null);
        return await updateParent<TNumber, TUpdate>(id, updatedParent)
            .then((response) => {
                const editedParents = rootStore.parents.map((parent) => 
                    parent.id === id 
                               ? response 
                               : parent
                            );
                rootStore.setParents(editedParents);
                rootStore.setFilteredParents(editedParents)
            }).catch((error) => {
                const errorMessage = handleError(error);
                rootStore.setError(errorMessage);
            }).finally(() => {
                rootStore.setLoading(false);
            });
    };

    const removeParent = async <TNumber extends number>(
        id: TNumber
    ): Promise<void> => {
        rootStore.setLoading(true);
        rootStore.setError(null);
        return await deleteParent(id)
            .then(() => {
                rootStore.setParents(rootStore.parents.filter(p => p.id !== id));
                rootStore.setFilteredParents(rootStore.filteredParents.filter(p => p.id !== id));
            }).catch((error) => {
                const errorMessage = handleError(error);
                rootStore.setError(errorMessage);
            }).finally(() => {
                rootStore.setLoading(false);
            });
    };
    

    const searchParentQuery = async <
        TString extends string
    >(
        name?: TString
    ): Promise<void> => {
        rootStore.setLoading(true);
        rootStore.setError(null);
        return await searchParent<TString>(name)
            .then((response) => {
                rootStore.setFilteredParents(response);
            }).catch((error) => {
                const errorMessage = handleError(error);
                rootStore.setError(errorMessage);
            }).finally(() => {
                rootStore.setLoading(false);
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
                loading: rootStore.loading,
                error: rootStore.error,
                parents: rootStore.parents,
                filteredParents: rootStore.filteredParents,
                selectedParent: rootStore.selectedParent,
                overAllParent: rootStore.overAllParent
            }}
        >
            {children}
        </ParentContext.Provider>
    )
});