import { ModalProvider } from "../../components/modal/context/modal-context";
import { ClassProvider } from "../../screens/curriculum/class/context/class-context";
import { MenuItemProvider } from "../../screens/main/context/menu-context";
import { ParentProvider } from "../../screens/parents/context/parent-context";
import { TeacherProvider } from "../../screens/teacher/context/teacher-context";

interface RootProps {
    children: React.ReactNode
}

export const RootProviders: React.FC<RootProps> = ({ children }) => {
    return (
        <MenuItemProvider>
            <ModalProvider>
                <ClassProvider>
                    <TeacherProvider>
                        <ParentProvider>
                            {children}
                        </ParentProvider>
                    </TeacherProvider>
                </ClassProvider>
            </ModalProvider>
        </MenuItemProvider>
    )
};