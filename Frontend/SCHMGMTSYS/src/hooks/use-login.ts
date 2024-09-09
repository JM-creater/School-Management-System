import { useContext } from "react";
import { LoginContextType } from "../screens/auth/login/types/login-type";
import { LoginContext } from "../screens/auth/login/context/login-context";
import { errors } from "../configs/constants";

export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};