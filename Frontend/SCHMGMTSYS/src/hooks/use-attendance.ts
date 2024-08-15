import { useContext } from "react";
import { AttendanceContext } from "../screens/attendance/context/attendance-context";
import { AttendanceContextTypes } from "../screens/attendance/types/attendance-types";

export const useAttendance= (): AttendanceContextTypes => {
    const context = useContext(AttendanceContext);
    if (context === null) {
        throw new Error("useAttendance must be used within a AttendanceProvider");
    }
    return context;
};