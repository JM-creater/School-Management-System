import { Space } from "antd";
import { ClassData } from "../../data/class";

export const ColumnTable = (
    showEditModal: any, 
    fetchClassById: (id: number) => void, 
    removeClass: (id: number) => void
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
            </Space>
        ),
    },
];
