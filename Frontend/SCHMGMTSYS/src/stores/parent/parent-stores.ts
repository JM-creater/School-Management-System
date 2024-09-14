import { 
    cast, 
    Instance, 
    SnapshotIn, 
    SnapshotOut, 
    types 
} from "mobx-state-tree";
import { ParentData } from "../../configs/interface";

export const ParentStore = types
    .model({
        parents: types.array(types.frozen<ParentData>()),
        filteredParents: types.array(types.frozen<ParentData>()),
        selectedParent: types.maybeNull(types.frozen<ParentData>()),
        overAllParent: types.number,
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        setParents(parents: ParentData[]) {
            self.parents = cast(parents);
        },
        setFilteredParents(filteredParents: ParentData[]) {
            self.filteredParents = cast(filteredParents);
        },
        setSelectedParent(selectedParent: ParentData | null) {
            self.selectedParent = selectedParent;
        },
        setOverAllParent(overAllParent: number) {
            self.overAllParent = overAllParent;
        },
        setLoading(loading: boolean) {
            self.loading = loading;
        },

        setError(error: string | null) {
            self.error = error;
        }
}));

export const parentStore = ParentStore.create({
    parents: [],
    filteredParents: [],
    selectedParent: null,
    overAllParent: 0, 
    loading: false,
    error: null
});

export type IParentStore = Instance<typeof ParentStore>;
export type IParentStoreSnapshotIn = SnapshotIn<typeof ParentStore>;
export type IParentStoreSnapshotOut = SnapshotOut<typeof ParentStore>;
export type IParentStoreContextType = IParentStore;