import React, { createContext, useEffect, useState } from "react";
import { ParentContextType } from "../types/parent-types";
import { ParentProps } from "./props/parent-props";
import { ParentData } from "../data/parents";
import { createParent, getAllParent } from "../../../services/parent/parent-service";
import { Form, FormProps } from "antd";
import { toast } from "react-toastify";

export const ParentContext = createContext<ParentContextType | null>(null);

export const ParentProvider: React.FC<ParentProps> = ({ children }) => {
    
    const [parents, setParents] = useState<ParentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchParents = async () => {
            setLoading(true);
            try {
                const response = await getAllParent();
                setParents(response);
            } catch (error) {
                setError('Failed to catch employees');
            } finally {
                setLoading(false);
            }
        }

        fetchParents();
    }, []);

    const onFinishFailed: FormProps<ParentData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const createNewParents = async (parent: Omit<ParentData, 'id'>) => {
        setLoading(true);
        try {
            const response = await createParent(parent);
            setParents([...parents, response]);
            form.resetFields();
            toast.success("Parent added successfully");
        } catch (error) {
            setError('Failed to add parents')
        } finally {
            setLoading(false);
        }
    };

    const handleValues = {
        onFinishFailed,
        createNewParents,
        loading,
        error,
        parents
    };
    
    return (
        <ParentContext.Provider value={handleValues}>
            {children}
        </ParentContext.Provider>
    )
}