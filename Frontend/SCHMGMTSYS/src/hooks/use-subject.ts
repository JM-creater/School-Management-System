import { useContext } from "react";
import { SubjectContext } from "../screens/curriculum/subject/context/subject-context";
import { SubjectContextTypes } from "../screens/curriculum/subject/types/subject-types";

export const useSubject = (): SubjectContextTypes => {
    const context = useContext(SubjectContext);
    if (context === null) {
        throw new Error("useSubject must be used within a SubjectProvider");
    }
    return context;
};