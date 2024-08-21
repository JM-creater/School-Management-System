import React, { useEffect } from 'react';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
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

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper" style={marginBottomStyles}>
    <p className="site-description-item-profile-p-label" style={fontWeightText}>{title}:</p>
    {content}
  </div>
);

export const TeacherScreen: React.FC = () => {

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
    return classroom ? classroom.name : 'Unknown Classroom';
  };

  /**
   * Handles the editing of a teacher's data by calling the `editTeacher` function with the selected teacher's ID and updated data.
   *
   * @param {Omit<TeacherData, 'id'>} teacher - The updated teacher data excluding the 'id' field.
   * @return {Promise<void>} Resolves when the teacher has been successfully updated.
   * @throws {Error} If there is an error during the update process.
  */
  const handleEdit = async <T extends Omit<TeacherData, 'id'>>(
    teacher: T
  ): Promise<void> => {
    if (selectedTeacher) {
      await editTeacher(selectedTeacher.id as number, teacher);
      closeEditModal();
    }
  };
  
  /**
   * Handles the keydown event for an input element by triggering a search when the "Enter" key is pressed.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keydown event from the input element.
   * @return {Promise<void>} Resolves when the search query has been processed.
  */
  const handleKeyDown = async <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ): Promise<void> => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
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
        title='Class Details'
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
                
                {/* Need fix dates field */}

                {/* <Col span={12}>
                  <DescriptionItem 
                    title="Date of Birth" 
                    content={selectedTeacher.dateOfBirth} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Employment Date" 
                    content={selectedTeacher.dateOfBirth.format("YYYY-MM-DD")} 
                  />
                </Col> */}
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
};