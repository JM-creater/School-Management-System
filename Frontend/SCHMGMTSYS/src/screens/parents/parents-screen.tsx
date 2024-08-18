import React, { useEffect } from 'react';
import { Input, Spin, Table } from 'antd';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { useParent } from '../../hooks/use-parent';
import { ParentData } from './data/parents';
import { ColumnTable } from './components/columns/columns';
import { ButtonParentContainer, CenteredContainer, ErrorDiv } from './themes/parents-styles';
import { ParentAddForm, ParentEditForm } from './components/modal/modal-parent';

export const ParentsScreen: React.FC = () => {

  const { 
    form, 
    openModal,
    openEditModal,
    closeModal, 
    showModal, 
    closeEditModal,
    showEditModal
  } = useModal();
  const { 
    selectedParent,
    error, 
    loading, 
    filteredParents,
    createNewParents, 
    fetchParentById,
    removeParent,
    editParent,
    searchParentQuery
  } = useParent();
  const columns = ColumnTable(
    showEditModal, 
    fetchParentById, 
    removeParent
  );

  const handleEdit = async (record: Omit<ParentData, 'id'>) => {
    if (selectedParent) {
      await editParent(selectedParent.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchParentQuery(value);
    }
  };
  
  useEffect(() => {
    if (selectedParent) {
      form.setFieldsValue({
        firstName: selectedParent.firstName,
        lastName: selectedParent.lastName,
        email: selectedParent.email,
        phoneNumber: selectedParent.phoneNumber,
      });
    }
  }, [selectedParent, form]);

  return (
    <React.Fragment>
      <ButtonParentContainer>
        <Input.Search 
          onSearch={(value: string) => searchParentQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by parent name..." 
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
          label='Add Parent' 
        />
      </ButtonParentContainer>

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
                dataSource={filteredParents} 
              />
            </React.Fragment>
          )
        }
      </React.Fragment>
       
      <CustomModal
        open={openModal}
        title='Add Parent'
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <ParentAddForm
          form={form}
          createNewParents={createNewParents}
        />
       </CustomModal>

       <CustomModal
          open={openEditModal}
          title="Edit Parent"
          onOk={form.submit}
          onCancel={() => {
            closeEditModal();
            form.resetFields();
          }}
          centered
        >
            <ParentEditForm
              form={form}
              handleEdit={handleEdit}
            />
        </CustomModal>
      
    </React.Fragment>
  )
}
