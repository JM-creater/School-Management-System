import { useContext } from "react";
import { TeacherContext } from "../screens/teacher/context/teacher-context";
import { TeacherContextTypes } from "../screens/teacher/types/teacher-types";
import { errors } from "../configs/constants";

export const useTeacher = (): TeacherContextTypes => {
    const context = useContext(TeacherContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};