export interface CustomModalProps {
    open: boolean;
    title: string;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
    centered?: boolean;
}
