import { Space } from "antd";
import { useClass } from "../../../../../hooks/use-class";
import { ClassData } from "../../data/class";

export const ColumnTable = () => {

    const { removeClass  } = useClass();

    return [
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
                    <a>Edit</a>
                    <a onClick={() => removeClass(record.id)}>Delete</a>
                </Space>
            ),
        },
    ];
};
