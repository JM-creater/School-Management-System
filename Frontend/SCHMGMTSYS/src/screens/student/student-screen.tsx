import React from 'react';
import { Button, Col, Form, Input, Row, Space, Table, Tag, Upload } from 'antd';
import { CustomButton } from '../../components/button/button';
import {ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { useModal } from '../../hooks/use-modal';
import { CustomModal } from '../../components/modal/modal';
import { UploadOutlined } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


export const StudentScreen: React.FC = () => {

  const { showModal, closeModal, openModal } = useModal();

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
            label='Add Student' 
        />
      </ButtonContainer>
      <Table dataSource={data}>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(_: unknown, record: DataType) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>

    <CustomModal
      open={openModal}
      title='Add Student'
      onOk={closeModal}
      onCancel={closeModal}
      centered
    >
      <Form 
        // form={form}
        layout="vertical" 
        hideRequiredMark
        // onFinish={onFinishCreateProduct}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="supplierId"
              label="Supplier Id"
            >
              <Input
                variant='borderless'
                style={{ width: '100%' }}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter a Phone Number' }]}
            >
                <Input placeholder="Please enter Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter a Price' }]}
            >
                <Input placeholder="Please enter Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="productImage"
              label="Image"
              rules={[{ required: true, message: 'Please upload an Image' }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                      return e;
                  } 
                  return e && e.fileList;
              }}
            >
              <Upload  listType="picture">
                <Button icon={<UploadOutlined/>}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantityOnHand"
              label="Quantity"
              rules={[{ required: true, message: 'Please enter a Quantity' }]}
            >
              <Input placeholder="Please enter a Quantity" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter product description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter product description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
    </React.Fragment>
  )
};