import React, { createContext, useCallback, useEffect, useState } from "react";
import { ParentContextType } from "../types/parent-types";
import { ParentProps } from "./props/parent-props";
import { ParentData } from "../data/parents";
import { createParent, deleteParent, getAllCountParent, getAllParent, getParentById, updateParent } from "../../../services/parent/parent-service";
import { FormProps } from "antd";
import { toast } from "react-toastify";

export const ParentContext = createContext<ParentContextType | null>(null);

export const ParentProvider: React.FC<ParentProps> = ({ children }) => {
    
    const [parents, setParents] = useState<ParentData[]>([]);
    const [overAllParent, setOverAllParent] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
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

                const overAllParentResponse = await getAllCountParent();
                setOverAllParent(overAllParentResponse);
            } catch (error) {
                console.log(error);
                setError('Failed to catch parents');
            } finally {
                setLoading(false);
            }
        }

        fetchParents();
    }, []);

    const fetchParentById = useCallback(async (parentId: number) => {
        try {
            const response = await getParentById(parentId);
            setSelectedParent(response);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch parent by ID');
        }
    }, []);
    
    const createNewParents = async (parent: Omit<ParentData, 'id'>) => {
        setLoading(true);
        try {
            const response = await createParent(parent);
            setParents([...parents, response]);
            toast.success("Parent added successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to add parents'); 
        } finally {
            setLoading(false);
        }
    };

    const editParent = async (id: number, updatedParent: Omit<ParentData, 'id'>) => {
        setLoading(true);
        try {
            const response = await updateParent(id, updatedParent);
            setParents(parents.map(parent => parent.id === id ? response : parent));
            toast.success("Parent updated successfully");
        } catch (error) {
            console.log(error);
            setError('Failed to update parent'); 
        } finally {
            setLoading(false);
        }
    };

    const removeParent = async (id: number) => {
        setLoading(true);
        try {
            await deleteParent(id);
            setParents((prevParent) => prevParent.filter(p => p.id !== id));
        } catch (error) {
            console.log(error);
            setError('Failed to delete parent');
        } finally {
            setLoading(false);
        }
    };

    const handleValues = {
        editParent,
        removeParent,
        fetchParentById,
        onFinishFailed,
        createNewParents,
        loading,
        error,
        parents,
        selectedParent,
        overAllParent
    };
    
    return (
        <ParentContext.Provider value={handleValues}>
            {children}
        </ParentContext.Provider>
    )
}