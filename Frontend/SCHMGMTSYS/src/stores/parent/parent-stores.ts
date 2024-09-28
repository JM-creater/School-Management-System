import { 
    cast, 
    Instance, 
    SnapshotIn, 
    SnapshotOut, 
    types 
} from "mobx-state-tree";
import { ParentData } from "../../configs/interface";

export const ParentDataModel = types.model({
    id: types.number,
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    phoneNumber: types.string,
});

export const ParentStoreModel = types
    .model({
        parents: types.array(ParentDataModel),
        filteredParents: types.array(ParentDataModel),
        selectedParent: types.maybeNull(ParentDataModel),
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

export type IParentStore = Instance<typeof ParentStoreModel>;
export type IParentStoreSnapshotIn = SnapshotIn<typeof ParentStoreModel>;
export type IParentStoreSnapshotOut = SnapshotOut<typeof ParentStoreModel>;
export type IParentStoreContextType = IParentStore;
