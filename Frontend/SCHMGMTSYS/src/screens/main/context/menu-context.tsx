import { createContext, useState } from "react";
import { MenuItemProps } from "./props/menu-props";
import { headerNameStyle } from "../themes/main-styles";
import { TeacherScreen } from "../../teacher/teacher-screen";
import { DashboardScreen } from "../../dashboard/dashboard";
import { MenuItemContextType } from "../types/menu-types";
import { ParentsScreen } from "../../parents/parents-screen";
import { CourseScreen } from "../../curriculum/course/course-screen";
import { ClassScreen } from "../../curriculum/class/class-screen";
import { AttendanceScreen } from "../../attendance/attendance-screen";
import { StudentScreen } from "../../student/student-screen";

export const MenuItemContext = createContext<MenuItemContextType | null>(null);

export const MenuItemProvider: React.FC<MenuItemProps> = ({ children }) => {

    const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>('1');
    const [changeHeader, setChangeHeader] = useState<number>(1);

    const handleChangeHeader = (item: number) => {
        setChangeHeader(item);
    };

    const handleChangeKey = (e: { key: string }) => {
        setSelectedKeyMenu(e.key);
    };

    const handleClickBreadCrumb = (item: string) => {
        setSelectedKeyMenu(item);
    };

    const renderContent = () => {
        switch (selectedKeyMenu) {
            case '1':
                return (
                    <DashboardScreen/>
                )
            case '2':
                return (
                    <StudentScreen/>
                )
            case '3': 
                return (
                    <TeacherScreen/>
                )
            case '4': 
                return (
                    <CourseScreen/>
                )
            case '5': 
                return (
                    <ClassScreen/>
                )
            case '6':
                return(
                    <AttendanceScreen/>
                )
            case '7':
                return (
                    <ParentsScreen/>
                )
            default:
                return null;
        }
    };

    const renderHeader = () => {
        switch (changeHeader) {
            case 1:
                return (
                    <span style={headerNameStyle}>Dashboard</span>
                )
            case 2:
                return (
                    <span style={headerNameStyle}>Student</span>
                )
            case 3:
                return (
                    <span style={headerNameStyle}>Teacher</span>
                )
            case 4:
                return (
                    <span style={headerNameStyle}>Course</span>
                )
            case 5:
                return (
                    <span style={headerNameStyle}>Class</span>
                )
            case 6:
                return (
                    <span style={headerNameStyle}>Attendance</span>
                )
            case 7:
                return (
                    <span style={headerNameStyle}>Parents</span>
                )
            default:
                return null;
        }
    };

    const handleValues = {
        renderHeader,
        handleChangeHeader,
        handleClickBreadCrumb,
        handleChangeKey,
        renderContent,
        selectedKeyMenu
    };

    return (
        <MenuItemContext.Provider value={handleValues}>
            {children}
        </MenuItemContext.Provider>
    )
}