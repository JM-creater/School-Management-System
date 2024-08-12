import React, { createContext, useCallback, useEffect, useState } from "react";
import { ParentContextType } from "../types/parent-types";
import { ParentProps } from "./props/parent-props";
import { ParentData } from "../data/parents";
import { createParent, getAllParent, getAllParentById, updateParent } from "../../../services/parent/parent-service";
import { Form, FormProps } from "antd";
import { toast } from "react-toastify";

export const ParentContext = createContext<ParentContextType | null>(null);

export const ParentProvider: React.FC<ParentProps> = ({ children }) => {
    
    const [parents, setParents] = useState<ParentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [selectedParent, setSelectedParent] = useState<ParentData | null>(null);

    const onFinishFailed: FormProps<ParentData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchParents = async () => {
            setLoading(true);
            try {
                const response = await getAllParent();
                setParents(response);
            } catch (error) {
                console.log(error);
                setError('Failed to catch employees');
            } finally {
                setLoading(false);
            }
        }

        fetchParents();
    }, []);

    const fetchParentById = useCallback(async (parentId: number) => {
        setLoading(true);
        try {
            const response = await getAllParentById(parentId);
            setSelectedParent(response);
            form.setFieldsValue(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch parent by ID');
        } finally {
            setLoading(false);
        }
    }, [form]);
    

    const createNewParents = async (parent: Omit<ParentData, 'id'>) => {
        setLoading(true);
        try {
            const response = await createParent(parent);
            setParents([...parents, response]);
            form.resetFields();
            toast.success("Parent added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add parents'); 
        } finally {
            setLoading(false);
        }
    };

    const editParent = async (parentId: number, parent: ParentData) =>  {
        setLoading(true);
        try {
            const updatedParent = await updateParent(parent, parentId);
            setParents(parents.map(p => (p.id === updatedParent.id ? updatedParent : p)));
        } catch (error) {
            console.log(error);
            setError('Failed to edit parents');
        } finally {
            setLoading(false);
        }
    };


    const handleValues = {
        editParent,
        fetchParentById,
        onFinishFailed,
        createNewParents,
        loading,
        error,
        parents,
        selectedParent
    };
    
    return (
        <ParentContext.Provider value={handleValues}>
            {children}
        </ParentContext.Provider>
    )
}