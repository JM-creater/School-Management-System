import { useContext } from "react";
import { TeacherContext } from "../screens/teacher/context/teacher-context";
import { TeacherContextTypes } from "../screens/teacher/types/teacher-types";

export const useTeacher = (): TeacherContextTypes => {
    const context = useContext(TeacherContext);
    if (context === null) {
        throw new Error("useTeacher must be used within a TeacherProvider");
    }
    return context;
};