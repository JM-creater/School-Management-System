import { FormInstance } from "antd";

export interface LoginContextType {
    form: FormInstance,
    loading: boolean;
    handleLogin: () => Promise<void>;
};