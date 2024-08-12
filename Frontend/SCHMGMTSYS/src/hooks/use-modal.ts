import { useContext } from "react";
import { ModalContextTypes } from "../components/modal/context/types/modal-types";
import { ModalContext } from "../components/modal/context/modal-context";

export const useModal = (): ModalContextTypes => {
    const context = useContext(ModalContext);
    if (context === null) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}