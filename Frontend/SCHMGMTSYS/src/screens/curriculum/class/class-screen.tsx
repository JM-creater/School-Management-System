import React, { useEffect } from 'react';
import { Col, Input, Row, Spin, Table } from 'antd';
import { ColumnTable } from './components/column/column';
import { useClass } from '../../../hooks/use-class';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { buttonWidthStyles, fontWeightText, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { ClassData } from './data/class';
import { ButtonClassContainer } from './styles/class-style';
import { ClassAddForm, ClassEditForm } from './components/form/form-class';
import { ENTER } from '../../../configs/constants';

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
    searchClassQuery,
    rowClick
  } = useClass();
  
  const { 
    form, 
    openModal, 
    openEditModal,
    openDetailModal,
    showModal, 
    closeModal,
    closeEditModal,
    showEditModal,
    closeDetailModal,
    showDetailModal,
  } = useModal();

  const columns = ColumnTable(
    showEditModal,
    fetchClassById,
    removeClass,
    showDetailModal,
    rowClick
  );

  useEffect(() => {
    if (selectedClasses) {
      form.setFieldsValue({
        name: selectedClasses.name,
        grade: selectedClasses.grade
      } as Pick<ClassData, 'name' | 'grade'>);
    }
  }, [selectedClasses, form]);

  const handleEdit = async <T extends Omit<ClassData, 'id'>>(
    record: T
  ): Promise<void> => {
    if (selectedClasses) {
      await editClass(selectedClasses.id, record);
      closeEditModal();
    }
  };

  const handleKeyDown = async <T extends React.KeyboardEvent<HTMLInputElement>>(
    event: T
  ): Promise<void> => {
    if (event.key === ENTER) {
      const value = (
        event.currentTarget as HTMLInputElement
      ).value;
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
            <Table 
              columns={columns}
              dataSource={filteredClasses} 
            />
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

      <CustomModal
        open={openDetailModal}
        title='Class Details'
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        centered  
      >
        {
          selectedClasses && (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Class Name" content={selectedClasses.name} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Grade" content={selectedClasses.grade} />
                </Col>
              </Row>
            </React.Fragment>
          )
        }
      </CustomModal>
    </React.Fragment>
  );
};
