import { Space } from "antd";
import { TeacherData } from "../../../../teacher/data/teachers";
import { SubjectData } from "../../data/subject";
import { EyeOutlined } from "@ant-design/icons";

export const ColumnTable = (
    showEditModal: any, 
    teachers: TeacherData[],
    getTeacherFullNameById: (teacherId: number, teachers: TeacherData[]) => string,
    fetchSubjectById: (subjectId: number) => void,
    removeSubject: (id: number) => void,
    showDetailModal: any,
    rowClick: (record: SubjectData) => void
) => {
    return  [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
        },
        {
            title: 'Teacher',
            key: 'teacher',
            render: (record: SubjectData) => 
                record.teacher && record.teacher.id 
                ? getTeacherFullNameById(record.teacher.id, teachers)
                : 'No Teacher Assigned'
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: SubjectData) => (
                <Space size="middle">
                    <a onClick={() => {
                            fetchSubjectById(record.id as number);
                            showEditModal();
                        }}
                    >
                        Edit
                    </a>
                    <a 
                        onClick={() => removeSubject(record.id as number)}
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
}