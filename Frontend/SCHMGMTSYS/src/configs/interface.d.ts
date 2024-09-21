export interface ParentData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
};

export interface ClassData {
    id: number,
    name: string,
    grade: string,
};

export interface FormField {
    name: string;
    label: string;
    type: 'input' 
        | 'select' 
        | 'checkbox' 
        | 'datePicker' 
        | 'textarea';
    placeholder?: string;
    options?: { 
        label: string; 
        value: string | number 
    }[]; 
    rules?: object[];
    maxLength?: number | undefined;
};

export interface DetailField {
    title: string;
    content: keyof ParentData;
};

export interface DetailDisplay {
    data: DetailData; 
    fields: DetailField[];
};