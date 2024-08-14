import { Col, Form, Input, Row, Select, Spin, Table } from 'antd';
import React, { useEffect } from 'react';
import { ColumnTable } from './components/column';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../../dashboard/themes/dashboard-styles';
import { CustomButton } from '../../../components/button/button';
import { useSubject } from '../../../hooks/use-subject';
import { CenteredContainer, ErrorDiv } from '../../parents/themes/parents-styles';
import { useModal } from '../../../hooks/use-modal';
import { CustomModal } from '../../../components/modal/modal';
import { SubjectData } from './data/subject';
import { useTeacher } from '../../../hooks/use-teacher';

export const SubjectScreen: React.FC = () => {

  const {
    teachers,
    getTeacherFullNameById
  } = useTeacher();
  const {
    error,
    loading,
    selectedSubjects,
    subjects,
    onFinishFailed,
    createNewSubject,
    fetchSubjectById,
    editSubject,
    removeSubject
  } = useSubject(); 
  const {
    form,
    openModal,
    openEditModal,
    closeModal,
    showModal,
    showEditModal,
    closeEditModal
  } = useModal();
  const columns = ColumnTable(
    showEditModal,
    teachers, 
    getTeacherFullNameById,
    fetchSubjectById,
    removeSubject
  );

  const handleEdit = async (record: Omit<SubjectData, 'id'>) => {
    if (selectedSubjects) {
      await editSubject(selectedSubjects.id, record);
      closeEditModal();
    }
  };

  useEffect(() => {
    if (selectedSubjects) {
      form.setFieldsValue({
        name: selectedSubjects.name,
        code: selectedSubjects.code,
        credits: selectedSubjects.credits,
        teacher_id: selectedSubjects.teacher.id
      });
    }
  }, [selectedSubjects, form])

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
          label='Add Subject' 
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
               <Table columns={columns} dataSource={subjects} />
            </React.Fragment>
          )
        }
      </React.Fragment>

      <CustomModal
        open={openModal}
        title='Add Subject'
        onOk={closeModal}
        onCancel={closeModal}
        centered  
      >
        <Form  
          form={form}
          layout="vertical" 
          onFinish={createNewSubject}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="name"
                label="Subject Name"
                rules={[{ required: true, message: 'Please enter class name' }]}
              >
                <Input placeholder="Please enter classroom name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="code"
                label="Code"
                rules={[{ required: true, message: 'Please enter subject code' }]}
              >
                  <Input placeholder="Please enter subject code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="credits"
                label="Credits"
                rules={[{ required: true, message: 'Please enter credits' }]}
              >
                <Input placeholder="Please enter credits" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="teacher_id"
                label="Teacher"
                rules={[{ required: true, message: 'Please select a teacher' }]}
              >
                <Select
                  placeholder="Select a teacher to assign"
                >
                  {
                    teachers.map(
                      t => (
                          <Select.Option
                            key={t.id}
                            value={t.id}
                          >
                            {t.firstName}  {t.lastName}
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
        title='Edit Subject'
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
              <Form.Item<SubjectData>
                name="name"
                label="Subject Name"
                rules={[{ required: true, message: 'Please enter class name' }]}
              >
                <Input placeholder="Please enter classroom name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="code"
                label="Code"
                rules={[{ required: true, message: 'Please enter subject code' }]}
              >
                  <Input placeholder="Please enter subject code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="credits"
                label="Credits"
                rules={[{ required: true, message: 'Please enter credits' }]}
              >
                <Input placeholder="Please enter credits" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<SubjectData>
                name="teacher_id"
                label="Teacher"
                rules={[{ required: true, message: 'Please select a teacher' }]}
              >
                <Select
                  placeholder="Select a teacher to assign"
                >
                  {
                    teachers.map(
                      t => (
                          <Select.Option
                            key={t.id}
                            value={t.id}
                          >
                            {t.firstName}  {t.lastName}
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
}

