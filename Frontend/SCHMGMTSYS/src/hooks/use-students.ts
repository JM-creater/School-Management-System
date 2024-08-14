import { useContext } from "react";
import { StudentContext } from "../screens/student/context/student-context";
import { StudentContextTypes } from "../screens/student/types/student-types";

export const useStudent = (): StudentContextTypes => {
    const context = useContext(StudentContext);
    if (context === null) {
        throw new Error("useParent must be used within a ParentProvider");
    }
    return context;
};