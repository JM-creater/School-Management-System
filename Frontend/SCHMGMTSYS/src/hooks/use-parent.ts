import { useContext } from "react";
import { ParentContext } from "../screens/parents/context/parent-context";
import { ParentContextType } from "../screens/parents/context/props/parent-props";
import { errors } from "../configs/constants";

export const useParent = (): ParentContextType => {
    const context = useContext(ParentContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};