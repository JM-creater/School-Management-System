import { useContext } from "react";
import { AttendanceContext } from "../screens/attendance/context/attendance-context";
import { AttendanceContextTypes } from "../screens/attendance/types/attendance-types";
import { errors } from "../configs/constants";

export const useAttendance= (): AttendanceContextTypes => {
    const context = useContext(AttendanceContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};