import { types } from "mobx-state-tree";

export const ParentStoreModels = types.model({
    id: types.optional(types.number, 0),  
    firstName: types.optional(types.string, ""), 
    lastName: types.optional(types.string, ""),  
    email: types.optional(types.string, ""),  
    phoneNumber: types.optional(types.string, "")  
});