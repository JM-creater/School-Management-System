import { 
    cast, 
    Instance, 
    SnapshotIn, 
    SnapshotOut, 
    types 
} from "mobx-state-tree";
import { ClassData } from "../../configs/interface";

export const ClassStoreModel = types
    .model({
        classes: types.array(types.frozen<ClassData>()),
        filteredClasses: types.array(types.frozen<ClassData>()),
        selectedClass: types.maybeNull(types.frozen<ClassData>()),
        overAllClass: types.number,
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        setClasses(classes: ClassData[]) {
            self.classes = cast(classes);
        },
        setFilteredClasses(filteredClasses: ClassData[]) {
            self.filteredClasses = cast(filteredClasses);
        },
        setSelectedClass(selectedClass: ClassData | null) {
            self.selectedClass = selectedClass;
        },
        setOverAllClass(overAllClass: number) {
            self.overAllClass = overAllClass;
        },
        setLoading(loading: boolean) {
            self.loading = loading;
        },
        setError(error: string | null) {
            self.error = error;
        }
}));

export type IClassStore = Instance<typeof ClassStoreModel>;
export type IClasstStoreSnapshotIn = SnapshotIn<typeof ClassStoreModel>;
export type IClassStoreSnapshotOut = SnapshotOut<typeof ClassStoreModel>;
export type IClassStoreContextType = IClassStore;