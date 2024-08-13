import React from 'react';
import { Col, Form, Input, Row, Select, Spin, Table } from 'antd';
import { ColumnTable } from './components/column/column';
import { useClass } from '../../../hooks/use-class';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { ClassData } from './data/class';
import { useTeacher } from '../../../hooks/use-teacher';

export const ClassScreen: React.FC = () => {

  const { 
    error, 
    loading, 
    classes, 
    createNewClass, 
    onFinishFailed 
  } = useClass();
  const { teachers } = useTeacher();
  const { 
    form, 
    showModal, 
    openModal, 
    closeModal 
  } = useModal();

  const columns = ColumnTable();

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
          label='Add Parent' 
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
        title='Add Parent'
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<ClassData>
                name="teacher_id"
                label="Teacher"
                rules={[{ required: true, message: 'Please select a teacher' }]}
              >
                <Select
                  placeholder="Teacher"
                >
                  {
                    teachers.map(
                      teacher => (
                        <Select.Option
                            key={teacher.id}
                            value={teacher.id}
                        >
                          {teacher.firstName} {teacher.lastName}
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

