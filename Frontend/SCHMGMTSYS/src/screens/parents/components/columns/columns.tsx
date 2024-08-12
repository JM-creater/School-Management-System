import { Space } from "antd";
import { ParentData } from "../../data/parents";

export const ColumnTable = (showEditModal: any, fetchParentById: (id: number) => void) => [
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
        <a onClick={() => {
            showEditModal();
            fetchParentById(record.id)
          }}
        >
          Edit
        </a>
        <a>Delete</a>
      </Space>
    ),
  },
];