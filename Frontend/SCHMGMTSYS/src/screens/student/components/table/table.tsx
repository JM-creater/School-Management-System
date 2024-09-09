import { Space, Spin, Table } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { useStudent } from "../../../../hooks/use-students";
import React from "react";
import { CenteredContainer, ErrorDiv } from "../../../parents/themes/parents-styles";
import { useClass } from "../../../../hooks/use-class";
import { StudentData } from "../../data/student";
import { useParent } from "../../../../hooks/use-parent";
import { useModal } from "../../../../hooks/use-modal";
import { EyeOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

export const StudentTable: React.FC = () => {

    const {
        filteredStudents,
        loading,
        error,
        fetchStudentById,
        removeStudent,
        rowClick
    } = useStudent();
    const {
        classes
    } = useClass();
    const {
        parents
    } = useParent();
    const {
        showEditModal,
        showDetailModal
    } = useModal();

    const getClassName = (
        classroomId: number
    ) => {
        const classroom = classes.find(c => c.id === classroomId);
        return classroom ? classroom.name : 'Unknown Student';
    };

    const getParentName = (
        parentId: number
    ) => {
        const parent = parents.find(c => c.id === parentId);
        return parent ? `${parent.firstName} ${parent.lastName}` : 'Unknown Parent';
    };

    return (
        <React.Fragment>
            {
                loading ? (
                    <CenteredContainer>
                        <Spin size="large" />
                    </CenteredContainer>
                ) : error ? (
                    <ErrorDiv>{error}</ErrorDiv>
                ) : (
                    <React.Fragment>
                        <Table dataSource={filteredStudents} >
                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex="firstName" key="firstName" />
                                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                            </ColumnGroup>
                            <Column title="Address" dataIndex="address" key="address" />
                            <Column title="Date of Birth" dataIndex="dateOfBirth" key="dateOfBirth" />
                            <Column title="Enrollment date" dataIndex="enrollmentDate" key="enrollmentDate" />
                            <Column 
                                title="Classroom" 
                                key="classroom"
                                render={(record: StudentData) => getClassName(record.classroom.id as number)}
                            />
                            <Column 
                                title="Parent" 
                                key="parent"
                                render={(record: StudentData) => getParentName(record.parent.id as number)}
                            />
                            <Column title="Attendance Status" dataIndex="status" key="status" />
                            <Column
                                title="Action"
                                key="action"
                                render={(record: StudentData) => (
                                    <Space size="middle">
                                        <a onClick={() => {
                                            fetchStudentById(record.id as number);
                                            showEditModal();
                                        }}
                                        >
                                            Edit
                                        </a>
                                        <a
                                            onClick={() => removeStudent(record.id as number)}
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
                                )}
                            />
                         </Table>
                    </React.Fragment>
                )
            }
            
        </React.Fragment>
    );
};