import { Button as AntButton} from "antd";

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'; 
    style?: React.CSSProperties;
    prefix?: React.ReactNode;
}

export const CustomButton = (props: CustomButtonProps) => {
    const { 
        label, 
        onClick, 
        type = 'default', 
        style, 
        prefix 
    } = props;
    return (
        <AntButton type={type} onClick={onClick} style={style}>
            {prefix && <span className="button-prefix">{prefix}</span>} 
            {label}
        </AntButton>
    );
};