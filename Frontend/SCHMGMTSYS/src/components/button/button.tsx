import { Button } from "antd";

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'; 
    style: React.CSSProperties;
    prefix?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, type = 'default', style, prefix }) => {
    return (
        <Button type={type} onClick={onClick} style={style}>
            {prefix && <span className="button-prefix">{prefix}</span>} 
            {label}
        </Button>
    );
};