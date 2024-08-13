import { useContext } from "react";
import { ClassContextTypes } from "../screens/curriculum/class/types/class-types";
import { ClassContext } from "../screens/curriculum/class/context/class-context";

export const useClass = (): ClassContextTypes => {
    const context = useContext(ClassContext);
    if (context === null) {
        throw new Error("useClass must be used within a ClassProvider");
    }
    return context;
};