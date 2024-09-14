import { Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ParentData } from "../../../../configs/interface";

export const ColumnTable = (
  showEditModal: any, 
  fetchParentById: (id: number) => void, 
  removeParent: (id: number) => void,
  showDetailModal: any,
  rowClick: (record: ParentData) => void
) => [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: ParentData) => (
      <Space size="middle">
        <a
        onClick={async () => {
          fetchParentById(record.id as number);
          showEditModal();
        }}
        >
          Edit
        </a>
        <a 
          onClick={() => removeParent(record.id as number)}
        >
          Delete
        </a>
        <a 
          onClick={() => {
              showDetailModal();
              rowClick(record);
          }}
        >
          <EyeOutlined/>
        </a>
      </Space>
    ),
  },
];
