import React from 'react';
import { Space, Spin, Table } from 'antd';
import { useTeacher } from '../../../../hooks/use-teacher';
import { TeacherData } from '../../data/teachers';
import { useModal } from '../../../../hooks/use-modal';
import { CenteredContainer, ErrorDiv } from '../../../parents/themes/parents-styles';
import { useClass } from '../../../../hooks/use-class';

const { Column, ColumnGroup } = Table;

export const TeacherTable: React.FC = () => {

    const { 
        loading,
        error,
        teachers, 
        removeTeacher, 
        fetchTeacherById
    } = useTeacher();
    const {
        showEditModal
    } = useModal();
    const { classes } = useClass();

    const getClassName = (classroomId: number) => {
        const classroom = classes.find(c => c.id === classroomId);
        return classroom ? classroom.name : 'Unknown Classroom';
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
                        <Table dataSource={teachers}>
                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex="firstName" key="firstName" />
                                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                            </ColumnGroup>
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Employment date" dataIndex="employmentDate" key="employmentDate" />
                            <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                            <Column 
                                title="Classroom" 
                                key="classroom"
                                render={(record: TeacherData) => getClassName(record.classroom.id as number)}
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(record: TeacherData) => (
                                    <Space size="middle">
                                        <a onClick={() => {
                                            fetchTeacherById(record.id as number);
                                            showEditModal();
                                        }}
                                        >
                                            Edit
                                        </a>
                                        <a 
                                            onClick={() => removeTeacher(record.id as number)}
                                        >
                                            Delete
                                        </a>
                                    </Space>
                                )}
                            />
                        </Table>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
};
