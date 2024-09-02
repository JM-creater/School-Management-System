import { FormInstance } from "antd";

export interface FormProps {
    form: FormInstance,
    loading: boolean,
    handleLogin: () => void
};