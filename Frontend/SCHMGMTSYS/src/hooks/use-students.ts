import { useContext } from "react";
import { StudentContext } from "../screens/student/context/student-context";
import { StudentContextTypes } from "../screens/student/types/student-types";
import { errors } from "../configs/constants";

export const useStudent = (): StudentContextTypes => {
    const context = useContext(StudentContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};