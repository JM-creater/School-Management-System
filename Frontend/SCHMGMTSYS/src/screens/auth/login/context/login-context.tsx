import React, { createContext, useState } from "react";
import { LoginContextType } from "../types/login-type";
import { LoginProps } from "./props/login-props";
import { useForm } from "antd/es/form/Form";

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider: React.FC<LoginProps> = ({ children }) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = useForm()

    const handleLogin = async () => {
        setLoading(true);
    };

    const handleValue = {
        loading,
        handleLogin
    };

    return (
        <LoginContext.Provider value={handleValue}>
            {children}
        </LoginContext.Provider>
    )
};