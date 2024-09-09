import { useContext } from "react";
import { ClassContextTypes } from "../screens/curriculum/class/types/class-types";
import { ClassContext } from "../screens/curriculum/class/context/class-context";
import { errors } from "../configs/constants";

export const useClass = (): ClassContextTypes => {
    const context = useContext(ClassContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};