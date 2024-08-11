import { MenuItemProvider } from "../../screens/main/context/menu-context";

export const RootProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <MenuItemProvider>
            {children}
        </MenuItemProvider>
    )
};