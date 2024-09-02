import React, { useEffect } from 'react';
import { Col, Input, Row, Spin, Table } from 'antd';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { useParent } from '../../hooks/use-parent';
import { DescriptionItemProps, ParentData } from './data/parents';
import { ColumnTable } from './components/columns/columns';
import { ButtonParentContainer, CenteredContainer, ErrorDiv } from './themes/parents-styles';
import { ParentAddForm, ParentEditForm } from './components/form/form-parent';
import { 
  ADD_PARENT, 
  EMAIL, 
  ENTER, 
  FIRST_NAME, 
  LAST_NAME, 
  PARENT_DETAILS, 
  PHONE_NUMBER, 
  SEARCH_PARENT 
} from '../../configs/constants';

export const ParentsScreen: React.FC = () => {

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
    (id: number) => removeParent({ id }),
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

  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className="site-description-item-profile-wrapper" style={marginBottomStyles}>
      <p className="site-description-item-profile-p-label" style={fontWeightText}>{title}:</p>
      {content}
    </div>
  );
  
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
        title={ADD_PARENT}
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

      <CustomModal
        open={openDetailModal}
        title={PARENT_DETAILS}
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        centered  
      >
        {
          selectedParent && (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <DescriptionItem 
                    title={FIRST_NAME} 
                    content={selectedParent.firstName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title={LAST_NAME} 
                    content={selectedParent.lastName} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title={EMAIL} 
                    content={selectedParent.email} 
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem 
                    title={PHONE_NUMBER} 
                    content={selectedParent.phoneNumber} 
                  />
                </Col>
              </Row>
            </React.Fragment>
          )
        }
      </CustomModal>
      
    </React.Fragment>
  )
}
