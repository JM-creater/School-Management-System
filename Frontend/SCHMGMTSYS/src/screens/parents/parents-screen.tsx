import { 
  Input, 
  Spin, 
  Table 
} from 'antd';
import { 
  ButtonParentContainer, 
  CenteredContainer, 
  ErrorDiv 
} from './themes/parents-styles';
import { 
  ADD_PARENT, 
  EDIT_PARENT, 
  ENTER, 
  PARENT_DETAILS, 
  SEARCH_PARENT 
} from '../../configs/constants';
import { 
  buttonWidthStyles, 
  marginBottomStyles 
} from '../dashboard/themes/dashboard-styles';
import React, { useEffect } from 'react';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { CustomButton } from '../../components/button/button';
import { useParent } from '../../hooks/use-parent';
import { ColumnTable } from './components/columns/column';
import { observer } from 'mobx-react-lite';
import { ParentData } from '../../configs/interface';
import { ParentForm } from './components';
import { CustomDetailDisplay } from '../../components';
import { InfoDisplay } from '../../components/details/detials-display';
import { FieldName } from '../../components/forms/enums/form-enum';

export const ParentsScreen: React.FC = observer(() => {

  const { 
    form, 
    openModal,
    openEditModal,
    openDetailModal,
    closeModal, 
    showModal, 
    closeEditModal,
    showEditModal,
    closeDetailModal,
    showDetailModal
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
    searchParentQuery,
    rowClick
  } = useParent();
  const columns = ColumnTable(
    showEditModal, 
    fetchParentById, 
    removeParent,
    showDetailModal,
    rowClick
  );

  useEffect(() => {
    if (selectedParent) {
      form.setFieldsValue({
        firstName: selectedParent.firstName,
        lastName: selectedParent.lastName,
        email: selectedParent.email,
        phoneNumber: selectedParent.phoneNumber,
      } as Pick<ParentData, 
      | 'firstName' 
      | 'lastName' 
      | 'email' 
      | 'phoneNumber'>);
    }
  }, [selectedParent, form]);

  const handleEdit = async <
    T extends Omit<ParentData, 'id'>
  >(
    record: T
  ) => {
    if (selectedParent) {
      await editParent(selectedParent.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = <
    T extends React.KeyboardEvent<HTMLInputElement>
  >(
    event: T
  ) => {
    if (event.key === ENTER) {
      const value = (event.currentTarget as HTMLInputElement).value;
      searchParentQuery(value);
    }
  };
  
  return (
    <React.Fragment>
      <ButtonParentContainer>
        <Input.Search 
          onSearch={(value: string) => searchParentQuery(value)}
          onKeyDown={handleKeyDown}
          placeholder={SEARCH_PARENT}
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
          label={ADD_PARENT}
        />
      </ButtonParentContainer>

      <React.Fragment>
        {loading ? (
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
        )}
      </React.Fragment>
       
      <CustomModal
        open={openModal}
        title={ADD_PARENT}
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <ParentForm
          form={form}
          createNewParents={createNewParents}
        />
       </CustomModal>

       <CustomModal
          open={openEditModal}
          title={EDIT_PARENT}
          onOk={form.submit}
          onCancel={() => {
            closeEditModal();
            form.resetFields();
          }}
          centered
        >
          <ParentForm
            form={form}
            handleEdit={handleEdit}
          />
        </CustomModal>

      <CustomModal
        open={openDetailModal}
        title={PARENT_DETAILS}
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        centered  
      >
        {selectedParent && (
          <CustomDetailDisplay
            data={selectedParent} 
            fields={InfoDisplay(FieldName.Parent)} 
          />
        )}
      </CustomModal>
      
    </React.Fragment>
  )
});
