import { useContext } from "react";
import { ParentContextType } from "../screens/parents/types/parent-types";
import { ParentContext } from "../screens/parents/context/parent-context";

export const useParent = (): ParentContextType => {
    const context = useContext(ParentContext);
    if (context === null) {
        throw new Error("useParent must be used within a ParentProvider");
    }
    return context;
}