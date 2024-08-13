import React, { useEffect } from 'react';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../components/button/button';
import { TeacherTable } from './components/table/teacher-table';
import { CustomModal } from '../../components/modal/modal';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { TeacherData } from './data/teachers';
import { useModal } from '../../hooks/use-modal';
import { useTeacher } from '../../hooks/use-teacher';
import moment from 'moment';
import { useClass } from '../../hooks/use-class';

export const TeacherScreen: React.FC = () => {

  const { 
    form, 
    closeModal, 
    showModal, 
    openModal,
    closeEditModal,
    openEditModal
  } = useModal();
  const {
    onFinishFailed,
    createNewTeacher,
    editTeacher,
    selectedTeacher
  } = useTeacher();
  const { classes } = useClass();

  const handleEdit = async (teacher: Omit<TeacherData, 'id'>) => {
    if (selectedTeacher) {
      await editTeacher(selectedTeacher.id as number, teacher);
      closeEditModal();
    }
  };

  useEffect(() => {
    if (selectedTeacher) {
      form.setFieldsValue({
        firstName: selectedTeacher.firstName,
        lastName: selectedTeacher.lastName,
        email: selectedTeacher.email,
        phoneNumber: selectedTeacher.phoneNumber,
        dateOfBirth: moment(selectedTeacher.dateOfBirth),
        employmentDate: moment(selectedTeacher.employmentDate),
        address: selectedTeacher.address,
        classroom_id: selectedTeacher.classroom.id
      });
    }
  }, [selectedTeacher, form]);

  return (
    <React.Fragment>
      <ButtonContainer>
        <CustomButton 
          type='primary' 
          onClick={() => {
            form.resetFields();
            showModal();
          }} 
          style={{ 
            ...marginBottomStyles, 
            ...buttonWidthStyles
            }} 
            label='Add Teacher' 
        />
      </ButtonContainer>
      <TeacherTable/>

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
          onFinish={createNewTeacher}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<TeacherData>
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<TeacherData>
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
              <Form.Item<TeacherData>
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                  <Input placeholder="Please enter Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<TeacherData>
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                  <Input maxLength={11} placeholder="Please enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ required: true, message: 'Please enter date of birth' }]}
                >
                  <DatePicker placeholder='Birth Date' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="employmentDate"
                  label="Employment Date"
                  rules={[{ required: true, message: 'Please enter employment date' }]}
                >
                  <DatePicker placeholder='Employment Date' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter address' }]}
                >
                  <Input placeholder="Please enter address" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="classroom_id"
                  label="Classroom"
                  rules={[{ required: true, message: 'Please select a classroom' }]}
                >
                  <Select
                    placeholder="Select a classroom to assign"
                  >
                    {
                      classes.map(
                        c => (
                          <Select.Option
                              key={c.id}
                              value={c.id}
                            >
                              {c.name}
                            </Select.Option>
                          )
                        )
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
          </Form>
      </CustomModal>

      <CustomModal
        open={openEditModal}
        title='Edit Parent'
        onOk={form.submit}
        onCancel={() => {
          closeEditModal();
          form.resetFields();
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
              <Form.Item<TeacherData>
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<TeacherData>
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
              <Form.Item<TeacherData>
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                  <Input placeholder="Please enter Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<TeacherData>
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                  <Input maxLength={11} placeholder="Please enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ required: true, message: 'Please enter date of birth' }]}
                >
                  <DatePicker placeholder='Birth Date' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="employmentDate"
                  label="Employment Date"
                  rules={[{ required: true, message: 'Please enter employment date' }]}
                >
                  <DatePicker placeholder='Employment Date' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter address' }]}
                >
                  <Input placeholder="Please enter address" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<TeacherData>
                  name="classroom_id"
                  label="Classroom"
                  rules={[{ required: true, message: 'Please select a classroom' }]}
                >
                  <Select
                    placeholder="Select a classroom to assign"
                  >
                    {
                      classes.map(
                        c => (
                          <Select.Option
                              key={c.id}
                              value={c.id}
                            >
                              {c.name}
                            </Select.Option>
                          )
                        )
                      }
                    </Select>
                  </Form.Item>
                </Col>
            </Row>
          </Form>
      </CustomModal>
    </React.Fragment>
  )
};