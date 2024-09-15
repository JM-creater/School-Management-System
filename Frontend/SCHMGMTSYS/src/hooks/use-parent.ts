import { useContext } from "react";
import { ParentContext } from "../screens/parents/context/parent-context";
import { errors } from "../configs/constants";
import { ParentContextProps } from "../configs/props";

export const useParent = (): ParentContextProps => {
    const context = useContext(ParentContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context as ParentContextProps; 
};
