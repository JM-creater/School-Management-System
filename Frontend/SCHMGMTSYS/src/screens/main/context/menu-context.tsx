import { createContext, useState } from "react";
import { MenuItemProps } from "./props/menu-props";
import { headerNameStyle } from "../themes/main-styles";
import { TeacherScreen } from "../../teacher/teacher-screen";
import { DashboardScreen } from "../../dashboard/dashboard";
import { MenuItemContextType } from "../types/menu-types";
import { ParentsScreen } from "../../parents/parents-screen";
import { ClassScreen } from "../../curriculum/class/class-screen";
import { AttendanceScreen } from "../../attendance/attendance-screen";
import { StudentScreen } from "../../student/student-screen";
import { SubjectScreen } from "../../curriculum/subject/subject-screen";

export const MenuItemContext = createContext<MenuItemContextType | null>(null);

export const MenuItemProvider: React.FC<MenuItemProps> = ({ children }) => {

    const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>(() => {
        return localStorage.getItem('selectedKeyMenu') || '1'; 
    });
    const [changeHeader, setChangeHeader] = useState<number>(() => {
        return parseInt(localStorage.getItem('selectedKeyMenu') || '1');  
    });

    const handleChangeHeader = (item: number) => {
        setChangeHeader(item);
        localStorage.setItem('selectedKeyMenu', item.toString());  
    };

    const handleChangeKey = (e: { key: string }) => {
        setSelectedKeyMenu(e.key);
        localStorage.setItem('selectedKeyMenu', e.key); 
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
                    <SubjectScreen/>
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
                    <span style={headerNameStyle}>Subject</span>
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

    return (
        <MenuItemContext.Provider 
            value={{
                renderHeader,
                handleChangeHeader,
                handleClickBreadCrumb,
                handleChangeKey,
                renderContent,
                selectedKeyMenu
            }}
        >
            {children}
        </MenuItemContext.Provider>
    )
}