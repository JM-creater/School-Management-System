import { useContext } from "react";
import { ModalContextTypes } from "../components/modal/context/types/modal-types";
import { ModalContext } from "../components/modal/context/modal-context";
import { errors } from "../configs/constants";

export const useModal = (): ModalContextTypes => {
    const context = useContext(ModalContext);
    if (context === null) {
        throw new Error(errors.ERROR_HOOKS);
    }
    return context;
};