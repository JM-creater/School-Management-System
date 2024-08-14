import React, { useEffect } from 'react';
import { Col, Form, Input, Row, Spin, Table } from 'antd';
import { ColumnTable } from './components/column/column';
import { useClass } from '../../../hooks/use-class';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { ClassData } from './data/class';

export const ClassScreen: React.FC = () => {

  const { 
    error, 
    loading, 
    classes, 
    selectedClasses,
    createNewClass, 
    onFinishFailed, 
    removeClass,
    fetchClassById,
    editClass
  } = useClass();
  const { 
    form, 
    showModal, 
    openModal, 
    closeModal,
    openEditModal,
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
      <ButtonContainer>
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
      </ButtonContainer>

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
              <Table columns={columns} dataSource={classes} />
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
        <Form  
          form={form}
          layout="vertical" 
          onFinish={createNewClass}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<ClassData>
                name="name"
                label="Class Name"
                rules={[{ required: true, message: 'Please enter class name' }]}
              >
                <Input placeholder="Please enter classroom name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<ClassData>
                name="grade"
                label="Grade Level"
                rules={[{ required: true, message: 'Please enter grade level' }]}
              >
                  <Input placeholder="Please enter grade level" />
              </Form.Item>
            </Col>
          </Row>
          </Form>
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
          <Form  
            form={form}
            layout="vertical" 
            onFinish={handleEdit}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<ClassData>
                  name="name"
                  label="Classroom Name"
                  rules={[{ required: true, message: 'Please enter classroom name' }]}
                >
                  <Input placeholder="Please enter classroom name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<ClassData>
                  name="grade"
                  label="Grade Level"
                  rules={[{ required: true, message: 'Please enter grade level' }]}
                >
                    <Input placeholder="Please enter grade level" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
       </CustomModal>
    
    </React.Fragment>
  )
};

