import { useContext } from "react";
import { MenuItemContextType } from "../screens/main/types/menu-types";
import { MenuItemContext } from "../screens/main/context/menu-context";
import { errors } from "../configs/constants";

export const useItemMenu = (): MenuItemContextType => {
    const context = useContext(MenuItemContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};