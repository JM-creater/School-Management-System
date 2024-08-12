import { FormInstance } from "antd";

export interface ModalContextTypes {
    showEditModal: () => void;
    closeEditModal: () => void;
    showModal: () => void;
    closeModal: () => void;
    openModal: boolean;
    form: FormInstance;
    openEditModal: boolean;
}