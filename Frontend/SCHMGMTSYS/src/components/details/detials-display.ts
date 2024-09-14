import { DetailField } from "../../configs/interface";
import { FieldName } from "../forms/enums/form-enum";

export const InfoDisplay = (entityType: 'parent'): DetailField[] => {
    switch(entityType) {
        case FieldName.Parent:
            return [
                { 
                    title: 'First Name', 
                    content: 'firstName' 
                },
                { 
                    title: 'Last Name', 
                    content: 'lastName' 
                },
                { 
                    title: 'Email', 
                    content: 'email' 
                },
                { 
                    title: 'Phone Number', 
                    content: 'phoneNumber' 
                },
        
            ];
        default:
            return [];
    }
};