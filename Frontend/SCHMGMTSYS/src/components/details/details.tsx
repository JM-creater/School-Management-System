import { 
  Col as AntCol, 
  Row as AntRow 
} from "antd";
import { DescriptionItem } from "../item-view";
import { DetailDisplay } from "../../configs/interface";

export const CustomDetailDisplay = (props: DetailDisplay): JSX.Element => {
  const { 
    data, 
    fields 
  } = props;
  return (
    <AntRow>
      {fields.map((field, index) => (
        <AntCol span={12} key={index}>
          <DescriptionItem 
            title={field.title} 
            content={data[field.content]} 
          />
        </AntCol>
      ))}
    </AntRow>
  );
};
