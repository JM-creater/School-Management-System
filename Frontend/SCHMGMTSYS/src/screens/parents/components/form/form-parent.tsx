import { 
  ParentAddModalProps, 
  ParentEditModalProps 
} from "../../../../configs/props";
import { onFinishFailed } from "../../../teacher/context/exception/finish-failed";
import { CustomForms } from "../../../../components";
import { FieldDetails } from "../../../../components/forms/fields";
import { FieldName } from "../../../../components/forms/enums/form-enum";

export const ParentAddForm = (props: ParentAddModalProps) => {
  const { 
    form, 
    createNewParents 
  } = props;
  return (
    <CustomForms
      form={form}
      fields={FieldDetails(FieldName.Parent)}
      onFinish={createNewParents}
      onFinishFailed={onFinishFailed} 
    />
  )
};

export const ParentEditForm = (props: ParentEditModalProps) => {
  const { 
    form, 
    handleEdit 
  } = props;
  return (
    <CustomForms
      form={form}
      fields={FieldDetails(FieldName.Parent)}
      onFinish={handleEdit}
      // onFinishFailed={onFinishFailed} 
    />
  )
};