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

  useEffect(() => {
    if (selectedClasses) {
      form.setFieldsValue({
        name: selectedClasses.name,
        grade: selectedClasses.grade
      } as Pick<ClassData, 'name' | 'grade'>);
    }
  }, [selectedClasses, form]);

  /**
   * Handles editing of a class record.
   *
   * @param {Omit<ClassData, 'id'>} record - The updated class record data.
   * @return {Promise<void>} A promise that resolves when the edit operation is complete.
   */
  const handleEdit = async <T extends Omit<ClassData, 'id'>>(
    record: T
  ): Promise<void> => {
    if (selectedClasses) {
      await editClass(selectedClasses.id, record);
      closeEditModal();
    }
  };

  /**
   * Handles the key down event for the input field.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
   * @return {void} No return value.
  */
  const handleKeyDown = async <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ): Promise<void> => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchClassQuery(value);
    }
  };

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

