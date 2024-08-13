import { Space } from "antd";
// import { useClass } from "../../../../../hooks/use-class";

export const ColumnTable = () => {
    // const { classes } = useClass();

    // const getClassName = (classId: number) => {
    //     const classFound = classes.find(c => c.id === classId);
    //     return classFound ? `${classFound.name}` : 'No Class Found';
    // };

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
            title: 'Teacher',
            dataIndex: 'teacher_id',
            key: 'teacher_id',
            // render: (teacherId: number) => getClassName(teacherId),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
};
