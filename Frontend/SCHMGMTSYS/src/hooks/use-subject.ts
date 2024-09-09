import { useContext } from "react";
import { SubjectContext } from "../screens/curriculum/subject/context/subject-context";
import { SubjectContextTypes } from "../screens/curriculum/subject/types/subject-types";
import { errors } from "../configs/constants";

export const useSubject = (): SubjectContextTypes => {
    const context = useContext(SubjectContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};