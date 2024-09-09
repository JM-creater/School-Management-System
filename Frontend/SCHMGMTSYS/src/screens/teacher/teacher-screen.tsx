import React, { useEffect } from 'react';
import { buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { TeacherTable } from './components/table/teacher-table';
import { CustomModal } from '../../components/modal/modal';
import {  Col, Input, Row } from 'antd';
import { TeacherData } from './data/teachers';
import { useModal } from '../../hooks/use-modal';
import { useTeacher } from '../../hooks/use-teacher';
import moment from 'moment';
import { useClass } from '../../hooks/use-class';
import { ButtonTeacherContainer } from './styles/teacher-styles';
import { TeacherAddForm, TeacherEditForm } from './components/form/form-teacher';
import { ENTER, UKNOWN_CLASSROOM } from '../../configs/constants';
import { observer } from 'mobx-react-lite';
import { DescriptionItem } from '../../components/item-view/description-view';

export const TeacherScreen: React.FC = observer(() => {

  const { 
    form,
    openModal, 
    openEditModal,
    openDetailModal,
    closeModal, 
    showModal,
    closeEditModal,
    closeDetailModal
  } = useModal();
  const {
    selectedTeacher,
    editTeacher,
    searchTeacherQuery,
    createNewTeacher
  } = useTeacher();
  const { 
    classes 
  } = useClass();

  useEffect(() => {
    if (selectedTeacher) {
      form.setFieldsValue({
        firstName: selectedTeacher.firstName,
        lastName: selectedTeacher.lastName,
        email: selectedTeacher.email,
        phoneNumber: selectedTeacher.phoneNumber,
        dateOfBirth: moment(selectedTeacher.dateOfBirth, 'YYYY-MM-DD'),
        employmentDate: moment(selectedTeacher.employmentDate, 'YYYY-MM-DD'),
        address: selectedTeacher.address,
        classroom_id: selectedTeacher.classroom.id
      } as Pick<TeacherData, 
      | 'firstName' 
      | 'lastName'
      | 'email'
      | 'phoneNumber'
      | 'dateOfBirth'
      | 'employmentDate'
      | 'address'
      | 'classroom_id'>);
    }
  }, [selectedTeacher, form]);

  const getClassName = (
    classroomId: number
  ) => {
    const classroom = classes.find(c => c.id === classroomId);
    return classroom ? classroom.name : UKNOWN_CLASSROOM;
  };

  const handleEdit = async <T extends Omit<TeacherData, 'id'>>(
    teacher: T
  ): Promise<void> => {
    if (selectedTeacher) {
      await editTeacher(selectedTeacher.id as number, teacher);
      closeEditModal();
    }
  };
  
  const handleKeyDown = async <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ): Promise<void> => {
    if (event.key === ENTER) {
      const value = (
        event.currentTarget as HTMLInputElement
      ).value;
      searchTeacherQuery(value);
    }
  };

  return (
    <React.Fragment>
      <ButtonTeacherContainer>
        <Input.Search 
          onSearch={(value: string) => searchTeacherQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by teacher name..." 
          style={{ width: 300 }} 
        />
        <CustomButton 
          type='primary' 
          onClick={() => {
            form.resetFields();
            showModal();
          }} 
          style={{ 
            ...marginBottomStyles, 
            ...buttonWidthStyles
            }} 
            label='Add Teacher' 
        />
      </ButtonTeacherContainer>

      <React.Fragment>
        <TeacherTable/>
      </React.Fragment>

      <CustomModal
        open={openModal}
        title='Add Teacher'
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <TeacherAddForm
          form={form}
          createNewTeacher={createNewTeacher}
          classes={classes}
        />
      </CustomModal>

      <CustomModal
        open={openEditModal}
        title='Edit Teacher'
        onOk={form.submit}
        onCancel={() => {
          closeEditModal();
          form.resetFields();
        }}
        centered  
      >
        <TeacherEditForm
          form={form}
          handleEdit={handleEdit}
          classes={classes}
        />
      </CustomModal>

      <CustomModal
        open={openDetailModal}
        title='Teacher Details'
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        centered  
      >
        {
          selectedTeacher && (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <DescriptionItem 
                    title="First Name" 
                    content={selectedTeacher.firstName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Last Name" 
                    content={selectedTeacher.lastName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Email" 
                    content={selectedTeacher.email} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Class" 
                    content={getClassName(selectedTeacher.classroom_id)} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Email" 
                    content={selectedTeacher.email} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Phone Number" 
                    content={selectedTeacher.phoneNumber} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Date of Birth" 
                    content={moment(selectedTeacher.dateOfBirth).format('YYYY-MM-DD')} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Employment Date" 
                    content={moment(selectedTeacher.employmentDate).format('YYYY-MM-DD')} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Address" 
                    content={selectedTeacher.address} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Class" 
                    content={getClassName(selectedTeacher.classroom.id as number)} 
                  />
                </Col>
              </Row>
            </React.Fragment>
          )
        }
      </CustomModal>

    </React.Fragment>
  )
});