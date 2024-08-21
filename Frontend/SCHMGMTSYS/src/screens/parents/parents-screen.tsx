import React, { useEffect } from 'react';
import { Col, Input, Row, Spin, Table } from 'antd';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { useParent } from '../../hooks/use-parent';
import { ParentData } from './data/parents';
import { ColumnTable } from './components/columns/columns';
import { ButtonParentContainer, CenteredContainer, ErrorDiv } from './themes/parents-styles';
import { ParentAddForm, ParentEditForm } from './components/form/form-parent';

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

  const handleEdit = async <T extends Omit<ParentData, 'id'>>(
    record: T
  ) => {
    if (selectedParent) {
      await editParent(selectedParent.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ) => {
    if (event.key === "Enter") {
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

      <CustomModal
        open={openDetailModal}
        title='Parent Details'
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        centered  
      >
        {
          selectedParent && (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="First Name" content={selectedParent.firstName} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Last Name" content={selectedParent.lastName} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Email" content={selectedParent.email} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Phone Number" content={selectedParent.phoneNumber} />
                </Col>
              </Row>
            </React.Fragment>
          )
        }
      </CustomModal>
      
    </React.Fragment>
  )
}
