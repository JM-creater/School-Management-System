import { FieldName, FieldType } from "./enums/form-enum";
import { FormField } from "../../configs/interface";

export const FieldDetails = (entityType: 'parent'): FormField[] => {
    switch (entityType) {
      case FieldName.Parent:
        return [
            { 
                name: 'firstName', 
                label: 'First Name', 
                type: FieldType.Input,
                placeholder: 'Please enter first name', 
                rules: [{ required: true, message: 'Please enter first name' }] 
            },
            { 
                name: 'lastName', 
                label: 'Last Name', 
                type: FieldType.Input,
                placeholder: 'Please enter last name', 
                rules: [{ 
                    required: true, 
                    message: 'Please enter last name' 
                }] 
            },
            { 
                name: 'email', 
                label: 'Email', 
                type: FieldType.Input,
                placeholder: 'Please enter email', 
                rules: [{ 
                    required: true, 
                    message: 'Please enter email' 
                }] 
            },
            { 
                name: 'phoneNumber', 
                label: 'Phone Number', 
                type: FieldType.Input,
                placeholder: 'Please enter phone number', 
                rules: [{ 
                    required: true, 
                    message: 'Please enter phone number' 
                }] 
            }
        ];
      default:
        return [];
    }
};