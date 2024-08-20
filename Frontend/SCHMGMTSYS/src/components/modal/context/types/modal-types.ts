import { FormInstance } from "antd";

export interface ModalContextTypes {
    showDetailModal: () => void;
    closeDetailModal: () => void;
    showEditModal: () => void;
    closeEditModal: () => void;
    showModal: () => void;
    closeModal: () => void;
    openModal: boolean;
    form: FormInstance;
    openEditModal: boolean;
    openDetailModal: boolean;
};