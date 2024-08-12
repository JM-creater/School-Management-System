import { createContext, useState } from "react";
import { ModalContextProps } from "./props/modal-props";
import { ModalContextTypes } from "./types/modal-types";
import { Form } from "antd";

export const ModalContext = createContext<ModalContextTypes | null>(null);

export const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [form] = Form.useForm(); 

    const showModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const showEditModal = () => {
        setOpenEditModal(true);
    };

    const closeEditModal = () => {
        setOpenEditModal(false);
    };

    const handleValue = {
        showEditModal,
        closeEditModal,
        showModal,
        closeModal,
        openModal,
        form,
        openEditModal
    };
    
    return (
        <ModalContext.Provider value={handleValue}>
            {children}
        </ModalContext.Provider>
    )
}