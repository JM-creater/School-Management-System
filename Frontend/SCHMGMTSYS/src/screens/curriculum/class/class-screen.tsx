import React, { useEffect } from 'react';
import { Input, Spin, Table } from 'antd';
import { ColumnTable } from './components/column/column';
import { useClass } from '../../../hooks/use-class';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { buttonWidthStyles, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { ClassData } from './data/class';
import { ButtonClassContainer } from './styles/class-style';
import { ClassAddForm, ClassEditForm } from './components/form/form-class';

export const ClassScreen: React.FC = () => {

  const { 
    error, 
    loading, 
    filteredClasses,
    selectedClasses,
    createNewClass, 
    removeClass,
    fetchClassById,
    editClass,
    searchClassQuery
  } = useClass();
  const { 
    form, 
    openModal, 
    openEditModal,
    showModal, 
    closeModal,
    closeEditModal,
    showEditModal
  } = useModal();

  const columns = ColumnTable(
    showEditModal,
    fetchClassById,
    removeClass
  );

  const handleEdit = async (record: Omit<ClassData, 'id'>) => {
    if (selectedClasses) {
      await editClass(selectedClasses.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchClassQuery(value);
    }
  };

  useEffect(() => {
    if (selectedClasses) {
      form.setFieldsValue({
        name: selectedClasses.name,
        grade: selectedClasses.grade
      })
    }
  }, [selectedClasses, form]); 

  return (
    <React.Fragment>
      <ButtonClassContainer>
        <Input.Search 
          onSearch={(value: string) => searchClassQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by class name..." 
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
          label='Add Class' 
        />
      </ButtonClassContainer>

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
              <Table columns={columns} dataSource={filteredClasses} />
            </React.Fragment>
          )
        }
      </React.Fragment>

      <CustomModal
        open={openModal}
        title='Add Class'
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <ClassAddForm
          form={form}
          createNewClass={createNewClass}
        />
       </CustomModal>

       <CustomModal
          open={openEditModal}
          title='Edit Class'
          onOk={form.submit}
          onCancel={() => {
            form.resetFields();
            closeEditModal();
          }}
          centered  
        >
          <ClassEditForm
            form={form}
            handleEdit={handleEdit}
          />
       </CustomModal>
    </React.Fragment>
  )
};

