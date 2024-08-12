import { ModalProvider } from "../../components/modal/context/modal-context";
import { MenuItemProvider } from "../../screens/main/context/menu-context";
import { ParentProvider } from "../../screens/parents/context/parent-context";

interface RootProps {
    children: React.ReactNode
}

export const RootProviders: React.FC<RootProps> = ({ children }) => {
    return (
        <MenuItemProvider>
            <ParentProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ParentProvider>
        </MenuItemProvider>
    )
};