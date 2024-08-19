import { Col, Form, Input, Row } from "antd";
import { ClassData } from "../../data/class";
import { ClassAddModalProps, ClassEditModalProps } from "../../context/props/class-props";
import { onFinishFailed } from "../../../../teacher/context/exception/finish-failed";

export const ClassAddForm: React.FC<ClassAddModalProps> = ({ form, createNewClass }) => {
    return (
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
    )
};

export const ClassEditForm: React.FC<ClassEditModalProps> = ({ form, handleEdit }) => {
    return (
        <Form  
            form={form}
            layout="vertical" 
            onFinish={handleEdit}
            // onFinishFailed={onFinishFailed}
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
    )
};