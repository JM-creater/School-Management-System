export interface ParentData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
};

export interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
};