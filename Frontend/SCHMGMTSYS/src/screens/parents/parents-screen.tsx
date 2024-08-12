import React from 'react';
import { Col, Form, Input, Row, Spin, Table } from 'antd';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { useParent } from '../../hooks/use-parent';
import { ParentData } from './data/parents';
import { ColumnTable } from './components/columns/columns';

export const ParentsScreen: React.FC = () => {

  const { 
    form, 
    closeModal, 
    showModal, 
    openModal,
    closeEditModal,
    openEditModal,
    showEditModal
  } = useModal();
  const { 
    error, 
    loading, 
    parents, 
    createNewParents, 
    onFinishFailed 
  } = useParent();

  const columns = ColumnTable(showEditModal)

  return (
    <React.Fragment>
      <ButtonContainer>
        <CustomButton 
          type='primary' 
          onClick={showModal} 
          style={{ 
            ...marginBottomStyles, 
            ...buttonWidthStyles 
            }} 
            label='Add Parent' 
        />
      </ButtonContainer>

      <React.Fragment>
        {
          loading ? (
            <Spin size="large" />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <React.Fragment>
              <Table columns={columns} dataSource={parents} />
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
        <Form  
          form={form}
          layout="vertical" 
          onFinish={createNewParents}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Please enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                   <Input placeholder="Please enter last name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder="Please enter Phone Number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                    <Input maxLength={11} placeholder="Please enter phone number" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
       </CustomModal>

       <CustomModal
        open={openEditModal}
        title='Edit Parent'
        onOk={closeEditModal}
        onCancel={closeEditModal}
        centered  
      >
        <Form  
          form={form}
          layout="vertical" 
          onFinish={createNewParents}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Please enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                   <Input placeholder="Please enter last name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder="Please enter Phone Number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<ParentData>
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                    <Input maxLength={11} placeholder="Please enter phone number" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
       </CustomModal>
    </React.Fragment>
  )
}

