import { 
    Form as AntForm, 
    Input as AntInput, 
    Select as AntSelect, 
    Checkbox as AntCheckbox, 
    DatePicker as AntDatePicker, 
    Row as AntRow, 
    Col as AntCol 
} from 'antd';
import { FormField } from '../../configs/interface';
import { FieldType } from './enums/form-enum';
import { CustomFormProps } from '../../configs/props';

export const CustomForms = (props: CustomFormProps) => {
    const { 
        form, 
        fields, 
        onFinish, 
        onFinishFailed,
        layout = 'vertical' 
    } = props;  

    const renderFormField = (field: FormField): React.ReactNode => {
        switch (field.type) {
            case FieldType.Input:
                return <AntInput placeholder={field.placeholder} />;
            case FieldType.Textarea:
                return <AntInput.TextArea placeholder={field.placeholder} />;
            case FieldType.Select:
                return (
                    <AntSelect placeholder={field.placeholder}>
                        {field.options?.map(option => (
                            <AntSelect.Option key={option.value} value={option.value}>
                                {option.label}
                            </AntSelect.Option>
                        ))}
                    </AntSelect>
                );
            case FieldType.Checkbox:
                return <AntCheckbox>{field.label}</AntCheckbox>;
            case FieldType.DatePicker:
                return <AntDatePicker placeholder={field.placeholder} />;
            default:
                return null; 
        }
    };
      
    return (
        <AntForm 
            form={form} 
            layout={layout} 
            onFinish={onFinish} 
            onFinishFailed={onFinishFailed}
        >
            <AntRow 
                gutter={16}
            >
                {fields.map((field, index) => (
                    <AntCol span={12} key={index}>
                        <AntForm.Item 
                            name={field.name} 
                            label={field.label} 
                            rules={field.rules}
                        >
                            {renderFormField(field)}
                        </AntForm.Item>
                    </AntCol>
                ))}
            </AntRow>
        </AntForm>
  );
};
