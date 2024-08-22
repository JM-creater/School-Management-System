import React, { useEffect } from 'react';
import { Col, Input, Row } from 'antd';
import { CustomButton } from '../../components/button/button';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { StudentData } from './data/student';
import { useParent } from '../../hooks/use-parent';
import { useClass } from '../../hooks/use-class';
import { useStudent } from '../../hooks/use-students';
import { StudentTable } from './components/table/table';
import moment from 'moment';
import { ButtonStudentContainer } from './styles/student-styles';
import { StudentAddForm, StudentEditForm } from './components/form/form-student';
import { UKNOWN_CLASSROOM, UNKOWN_PARENT } from '../../configs/constants';

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

export const StudentScreen: React.FC = () => {

  const {
    parents
  } = useParent();
  const {
    classes
  } = useClass()
  const { 
    form,
    openModal,
    openEditModal,
    openDetailModal,
    showModal, 
    closeModal,
    closeEditModal, 
    closeDetailModal
  } = useModal();
  const {
    selectedStudents,
    editStudent,
    createNewStudent,
    searchStudentQuery
  } = useStudent();

  useEffect(() => {
    if (selectedStudents) {
      form.setFieldsValue({
        firstName: selectedStudents.firstName,
        lastName: selectedStudents.lastName,
        dateOfBirth: moment(selectedStudents.dateOfBirth),
        gender: selectedStudents.gender,
        address: selectedStudents.address,
        email: selectedStudents.email,
        phoneNumber: selectedStudents.phoneNumber,
        enrollmentDate: moment(selectedStudents.enrollmentDate),
        parent_id: selectedStudents.parent.id,
        classroom_id: selectedStudents.classroom.id
      });
    }
  }, [selectedStudents, form]);

  const getClassName = <T extends number>(
    classroomId: T
  ) => {
    const classroom = classes.find(c => c.id === classroomId);
    return classroom ? classroom.name : UKNOWN_CLASSROOM;
  };

  const getParentName = (
    parentId: number
  ) => {
      const parent = parents.find(c => c.id === parentId);
      return parent ? `${parent.firstName} ${parent.lastName}` : UNKOWN_PARENT;
  };

  /**
   * Handles the editing of a student by updating their information with the provided data.
   *
   * @param {Omit<StudentData, 'id'>} student - The student data to update, excluding the 'id' field.
   * @return {Promise<void>} A promise that resolves when the update operation completes.
  */
  const handleEdit = async <T extends Omit<StudentData, 'id'>>(
    teacher: T
  ): Promise<void> => {
    if (selectedStudents) {
      await editStudent(selectedStudents.id as number, teacher);
      closeEditModal();
    }
  };

  /**
   * Handles the key down event for an input field. Triggers a search query when the Enter key is pressed.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event triggered by the user.
   * @return {void}
  */
  const handleKeyDown = async <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ): Promise<void> => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchStudentQuery(value);
    }
  };

  return (
    <React.Fragment>
      <ButtonStudentContainer>
        <Input.Search 
          onSearch={(value: string) => searchStudentQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by student name..." 
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
            label='Add Student' 
        />
      </ButtonStudentContainer>

      <React.Fragment>
        <StudentTable/>
      </React.Fragment>
      
      <CustomModal
        open={openModal}
        title='Add Student'
        onOk={closeModal}
        onCancel={closeModal}
        centered
      >
        <StudentAddForm
          form={form}
          createNewStudent={createNewStudent}
          parents={parents}
          classes={classes}
        />
      </CustomModal>

      <CustomModal
        open={openEditModal}
        title='Edit Student'
        onOk={form.submit}
        onCancel={() => {
          closeEditModal();
          form.resetFields();
        }}
        centered
      >
        <StudentEditForm
          form={form}
          handleEdit={handleEdit}
          parents={parents}
          classes={classes}
        />
      </CustomModal>
      
        <CustomModal
          open={openDetailModal} 
          title='Student Details'
          onOk={closeDetailModal}
          onCancel={closeDetailModal}
          centered
        >
          {selectedStudents && (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <DescriptionItem 
                    title="First Name" 
                    content={selectedStudents.firstName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Last Name" 
                    content={selectedStudents.lastName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Email" 
                    content={selectedStudents.email} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Phone Number" 
                    content={selectedStudents.phoneNumber} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Date of Birth" 
                    content={moment(selectedStudents.dateOfBirth).format('YYYY-MM-DD')} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Parent" 
                    content={getParentName(selectedStudents.parent.id as number)} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Enrollment Date" 
                    content={moment(selectedStudents.enrollmentDate).format('YYYY-MM-DD')} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Address" 
                    content={selectedStudents.address} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Gender" 
                    content={selectedStudents.gender} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Class" 
                    content={getClassName(selectedStudents.classroom.id as number)} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title="Attendance Status" 
                    content={selectedStudents?.status} 
                  />
                </Col>
              </Row>
            </React.Fragment>
          )}
        </CustomModal>
    </React.Fragment>
  )
};