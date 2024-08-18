import { Input, Spin, Table } from 'antd';
import React, { useEffect } from 'react';
import { buttonWidthStyles, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useSubject } from '../../../hooks/use-subject';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { SubjectData } from './data/subject';
import { useTeacher } from '../../../hooks/use-teacher';
import { ButtonSubjectContainer } from './styles/subject-styles';
import { SubjectAddForm, SubjectEditForm } from './components/form/form-subject';
import { ColumnTable } from './components/column/column';

export const SubjectScreen: React.FC = () => {

  const {
    teachers,
    getTeacherFullNameById
  } = useTeacher();
  const {
    error,
    loading,
    selectedSubjects,
    filteredSubjects,
    createNewSubject,
    fetchSubjectById,
    editSubject,
    removeSubject,
    searchSubjectQuery
  } = useSubject(); 
  const {
    form,
    openModal,
    openEditModal,
    closeModal,
    showModal,
    showEditModal,
    closeEditModal
  } = useModal();
  const columns = ColumnTable(
    showEditModal,
    teachers, 
    getTeacherFullNameById,
    fetchSubjectById,
    removeSubject
  );

  const handleEdit = async (
    record: Omit<SubjectData, 'id'>
  ) => {
    if (selectedSubjects) {
      await editSubject(selectedSubjects.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchSubjectQuery(value);
    }
  };

  useEffect(() => {
    if (selectedSubjects) {
      form.setFieldsValue({
        name: selectedSubjects.name,
        code: selectedSubjects.code,
        credits: selectedSubjects.credits,
        teacher_id: selectedSubjects.teacher.id
      });
    }
  }, [selectedSubjects, form]);

  return (
    <React.Fragment>
      <ButtonSubjectContainer>
        <Input.Search 
          onSearch={(value: string) => searchSubjectQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by subject name..." 
          style={{ width: 300 }} 
        />
        <CustomButton 
          type='primary' 
          onClick={() => {
            showModal();
            form.resetFields();
          }} 
          style={{ 
            ...marginBottomStyles, 
            ...buttonWidthStyles 
          }} 
          label='Add Subject' 
        />
      </ButtonSubjectContainer>

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
               <Table 
                columns={columns} 
                dataSource={filteredSubjects} 
              />
            </React.Fragment>
          )
        }
      </React.Fragment>

      <CustomModal
        open={openModal}
        title='Add Subject'
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <SubjectAddForm
          form={form}
          createNewSubject={createNewSubject}
          teachers={teachers}
        />
       </CustomModal>

      <CustomModal
        open={openEditModal}
        title='Edit Subject'
        onOk={form.submit}
        onCancel={() => {
          form.resetFields();
          closeEditModal();
        }}
        centered  
      >
        <SubjectEditForm
          form={form}
          handleEdit={handleEdit}
          teachers={teachers}
        />
      </CustomModal>

    </React.Fragment>
  )
}

