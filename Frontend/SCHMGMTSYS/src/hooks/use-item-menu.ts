import { useContext } from "react";
import { MenuItemContextType } from "../screens/main/types/menu-types";
import { MenuItemContext } from "../screens/main/context/menu-context";

export const useItemMenu = (): MenuItemContextType => {
    const context = useContext(MenuItemContext);
    if (context === null) {
        throw new Error("useMenuItem must be used within a MenuItemProvider");
    }
    return context;
}