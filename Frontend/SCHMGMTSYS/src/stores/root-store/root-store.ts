import { 
    Instance, 
    SnapshotIn, 
    SnapshotOut, 
    types 
} from "mobx-state-tree";
import { ParentStoreModel } from "../parent/parent-stores";
import { ClassStoreModel } from "../class/class-store";

const DEFAULT_STATE = {
    parentStore: {
        parents: [],
        filteredParents: [],
        selectedParent: null,
        overAllParent: 0, 
        loading: false,
        error: null
    },
    classStore: {
        classes: [],
        filteredClasses: [],
        selectedClass: null,
        overAllClass: 0, 
        loading: false,
        error: null
    }
};

export const RootStoreModel = types
    .model({
        parentStore: ParentStoreModel,
        classStore: ClassStoreModel
    });

export const rootStore = RootStoreModel.create({
    parentStore: DEFAULT_STATE.parentStore,
    classStore: DEFAULT_STATE.classStore
});

export type IRootStoreModel = Instance<typeof RootStoreModel>;
export type IRootStoreSnapshotIn = SnapshotIn<typeof RootStoreModel>;
export type IRootStoreSnapshotOut = SnapshotOut<typeof RootStoreModel>;
export type IRootContextType = IRootStoreModel;