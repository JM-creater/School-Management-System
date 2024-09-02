import { useContext } from "react";
import { LoginContextType } from "../screens/auth/login/types/login-type";
import { LoginContext } from "../screens/auth/login/context/login-context";

export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (context === null) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};