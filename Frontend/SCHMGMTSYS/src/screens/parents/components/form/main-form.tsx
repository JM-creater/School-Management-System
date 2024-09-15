import { 
    ParentAddModalProps, 
    ParentEditModalProps 
} from "../../../../configs/props";
import { CustomForms } from "../../../../components";
import { FieldDetails } from "../../../../components/forms/fields";
import { onFinishFailed } from "../../../teacher/context/exception/finish-failed";
import { FieldName } from "../../../../components/forms/enums/form-enum";

type ParentFormProps = ParentAddModalProps | ParentEditModalProps;

export const ParentForm = (props: ParentFormProps) => {
  
  const isAddMode = (props as ParentAddModalProps).createNewParents !== undefined;
  
  const {
    form,
    createNewParents,
    handleEdit
  } = props as ParentAddModalProps & ParentEditModalProps;

  const handleFinish = isAddMode ? createNewParents : handleEdit;
  const handleFinishFailed = isAddMode ? onFinishFailed : undefined;

  return (
    <CustomForms
      form={form}
      fields={FieldDetails(FieldName.Parent)}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    />
  );
};