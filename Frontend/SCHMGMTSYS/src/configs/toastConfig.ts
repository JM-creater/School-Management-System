import { ToastPosition, Zoom } from "react-toastify";

export const toastConfig = {
    position: "top-center" as ToastPosition,
    autoClose: 1500,
    hideProgressBar: false,
    newestOnTop: true,
    limit: 1,
    transition: Zoom,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    pauseOnHover: false,
    theme: "light",
};