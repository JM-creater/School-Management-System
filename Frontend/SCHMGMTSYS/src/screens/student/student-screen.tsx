import React, { useEffect } from 'react';
import { Input } from 'antd';
import { CustomButton } from '../../components/button/button';
import { buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
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
    showModal, 
    closeModal,
    closeEditModal,
  } = useModal();
  const {
    selectedStudents,
    editStudent,
    createNewStudent,
    searchStudentQuery
  } = useStudent();

  const handleEdit = async (teacher: Omit<StudentData, 'id'>) => {
    if (selectedStudents) {
      await editStudent(selectedStudents.id as number, teacher);
      closeEditModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchStudentQuery(value);
    }
  };

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
    </React.Fragment>
  )
};