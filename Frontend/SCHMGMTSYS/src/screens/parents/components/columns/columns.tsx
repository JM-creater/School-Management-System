import { Space } from "antd";
import { ParentData } from "../../data/parents";
import { EyeOutlined } from "@ant-design/icons";

export const ColumnTable = (
  showEditModal: () => void, 
  fetchParentById: (id: number) => void, 
  removeParent: (id: number) => void,
  showDetailModal: () => void,
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
