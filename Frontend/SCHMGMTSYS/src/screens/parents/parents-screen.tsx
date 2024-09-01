import React, { useContext, useEffect } from 'react';
import { Col, Input, Row, Spin, Table } from 'antd';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { ParentData } from './data/parents';
import { ColumnTable } from './components/columns/columns';
import { ButtonParentContainer, CenteredContainer, ErrorDiv } from './themes/parents-styles';
import { ParentAddForm, ParentEditForm } from './components/form/form-parent';
import { observer } from 'mobx-react-lite';
import { ParentContext } from './context/parent-context';

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


export const ParentsScreen: React.FC = observer(() => {
  
  const store = useContext(ParentContext)
  
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

  const columns = ColumnTable(
    showEditModal, 
    store!.fetchParentById.bind(store), 
    store!.removeParent.bind(store),
    showDetailModal,
    store!.setSelectedParent.bind(store)
  );

  useEffect(() => {
    store!.fetchAllParents();
  }, [store]);

  useEffect(() => {
    if (store!.selectedParent) {
      form.setFieldsValue({
        firstName: store!.selectedParent.firstName,
        lastName: store!.selectedParent.lastName,
        email: store!.selectedParent.email,
        phoneNumber: store!.selectedParent.phoneNumber
      });
    }
  }, [form, store]);

  const handleEdit = async (record: Omit<ParentData, 'id'>) => {
    if (store!.selectedParent) {
      await store!.editParent(store!.selectedParent.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.currentTarget as HTMLInputElement).value;
      store!.searchParents(value);
    }
  };

return (
    <React.Fragment>
      <ButtonParentContainer>
        <Input.Search 
          onSearch={(value: string) => store!.searchParents(value)}
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
          store!.loading ? (
            <CenteredContainer>
                <Spin size="large" />
            </CenteredContainer>
          ) : store!.error ? (
            <ErrorDiv>{store!.error}</ErrorDiv>
          ) : (
            <React.Fragment>
              <Table 
                columns={columns} 
                dataSource={store!.filteredParents} 
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
          createNewParents={store!.createNewParent.bind(store)}
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
        <Row>
          <Col span={12}>
            <DescriptionItem 
              title="First Name" 
              content={store!.selectedParent?.firstName} 
            />
          </Col>
          <Col span={12}>
            <DescriptionItem 
              title="Last Name" 
              content={store!.selectedParent?.lastName} 
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem 
              title="Email" 
              content={store!.selectedParent?.email} 
            />
          </Col>
          <Col span={12}>
            <DescriptionItem 
              title="Phone Number" 
              content={store!.selectedParent?.phoneNumber} 
            />
          </Col>
        </Row>
      </CustomModal>
    </React.Fragment>
  );
});
