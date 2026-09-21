import React, { createContext, type ReactNode } from 'react'
import type { LoginAuthContextType } from '../types/login-types'
import { useLoginStore } from '../../../stores/login-store/login-store';

const LoginAuthContext = createContext<LoginAuthContextType | undefined>(undefined);

export const LoginAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const currentUser = useLoginStore((state) => state.currentUser);
    const login = useLoginStore((state) => state.login);
    const logout = useLoginStore((state) => state.logout);

    const value: LoginAuthContextType = {
        currentUser,
        isAuthenticated: !!currentUser,
        role: currentUser?.role || null,
        login,
        logout
    };

    return (
        <LoginAuthContext.Provider value={value}>{children}</LoginAuthContext.Provider>
    )
}
