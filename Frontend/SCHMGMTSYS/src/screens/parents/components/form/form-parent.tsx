import { Col, Form, Input, Row } from "antd";
import { ParentAddModalProps, ParentEditModalProps } from "../../context/props/parent-props";
import { ParentData } from "../../data/parents";
import { onFinishFailed } from "../../../teacher/context/exception/finish-failed";

export const ParentAddForm: React.FC<ParentAddModalProps> = ({ form, createNewParents }) => {
    return (
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
    )
};

export const ParentEditForm: React.FC<ParentEditModalProps> = ({ form, handleEdit }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleEdit}
            // onFinishFailed={onFinishFailed}
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
    )
};