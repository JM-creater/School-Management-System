import { Space } from "antd";
import { ClassData } from "../../data/class";
import { EyeOutlined } from "@ant-design/icons";

export const ColumnTable = (
    showEditModal: () => void, 
    fetchClassById: (id: number) => void, 
    removeClass: (id: number) => void,
    showDetailModal: () => void,
    rowClick: (record: ClassData) => void
) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: 'Action',
        key: 'action',
        render: (record: ClassData) => (
            <Space size="middle">
                <a 
                    onClick={() => {
                        fetchClassById(record.id as number);
                        showEditModal();
                    }}
                >
                    Edit
                </a>
                <a onClick={() => removeClass(record.id as number)}>Delete</a>
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
