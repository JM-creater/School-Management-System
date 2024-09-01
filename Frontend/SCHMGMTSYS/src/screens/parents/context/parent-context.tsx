import React, { createContext } from "react";
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
import { makeAutoObservable, runInAction } from "mobx";


class ParentStore {
    parents: ParentData[] = [];
    filteredParents: ParentData[] = [];
    selectedParent: ParentData | null = null;
    overAllParent: number = 0;
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Fetches all parents from the server and updates the state.
     * It also fetches the total count of parents and updates the state.
     * This function is called only once when the component mounts.
     *
     * @return {Promise<void>} A promise that resolves when the data is successfully fetched.
     */
    async fetchAllParents() {
        this.loading = true;

        await getAllParent()
            .then(async (response) => {
                runInAction(() => {
                    this.parents = response;
                    this.filteredParents = response;
                });
                return await getAllCountParent<string>();
            }).then(async (countResponse) => {
                runInAction(() => {
                    this.overAllParent = countResponse;
                });
            }).catch((error) => {
                runInAction(() => {
                    this.error = handleError(error);
                });
            }).finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            })
    };

    async fetchParentById<TNumber extends number>(
        id: TNumber
    ) {
        return await getParentById<TNumber>(id)
            .then((response) => {
                runInAction(() => {
                    this.selectedParent = response;
                });
            }).catch((error) => {
                runInAction(() => {
                    this.error = handleError<typeof error>(error);
                });
            });
    };

    async createNewParent<TParentData extends Omit<ParentData, 'id'>>(
        values: TParentData
    ) {
        this.loading = true;
        return await createParent<TParentData>(values)
            .then((response) => {
                runInAction(() => {
                    this.parents.push(response);
                    this.filteredParents.push(response);
                });
                toast.success(`Parent ${values.firstName} ${values.lastName} added successfully`);
            }).catch((error) => {
                runInAction(() => {
                    this.error = handleError(error);
                });
            }).finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            });
    };

    async editParent<TIDType extends number, TParentData extends Omit<ParentData, 'id'>>(
        id: TIDType,
        updatedParent: TParentData
    ) {
        this.loading = true;
        try {
            const response = await updateParent<TIDType, TParentData>(id, updatedParent);
            runInAction(() => {
                const index = this.parents.findIndex(parent => parent.id === id);
                if (index >= 0) {
                    this.parents[index] = response;
                    this.filteredParents[index] = response;
                }
            });
            toast.success(`Parent ${updatedParent.firstName} ${updatedParent.lastName} updated successfully`);
        } catch (error) {
            runInAction(() => {
                this.error = handleError(error);
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    

    async removeParent(id: number) {
        this.loading = true;
        try {
            await deleteParent(id);
            runInAction(() => {
                this.parents = this.parents.filter(parent => parent.id !== id);
                this.filteredParents = this.filteredParents.filter(parent => parent.id !== id);
            });
        } catch (error) {
            runInAction(() => {
                this.error = handleError(error);
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    async searchParents(name: string) {
        this.loading = true;
        try {
            const response = await searchParent(name);
            runInAction(() => {
                this.filteredParents = response;
            });
        } catch (error) {
            runInAction(() => {
                this.error = handleError(error);
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    setSelectedParent(parent: ParentData) {
        this.selectedParent = parent;
    };
};

export const ParentContext = createContext<ParentStore | null>(null);

export const ParentProvider: React.FC<ParentProps> = ({ children }) => {

    const store = new ParentStore();

    return (
        <ParentContext.Provider value={store}>
            {children}
        </ParentContext.Provider>
    )
};