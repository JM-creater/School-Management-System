import { ParentData } from "../data/parents";

export interface ParentContextType {
    searchParentQuery: (
        name?: string
    ) => Promise<void>;

    createNewParents: (
        parent: Omit<ParentData, 'id'>
    ) => Promise<void>;

    editParent: (
        id: number, 
        updatedParent: Omit<ParentData, 'id'>
    ) => Promise<void>;

    removeParent: (
        id: number
    ) => Promise<void>;

    fetchParentById: (
        parentId: number
    ) => Promise<void>;

    filteredParents:  ParentData[];
    parents: ParentData[];
    loading: boolean;
    error: string | null;
    selectedParent: ParentData | null;
    overAllParent: number;
};