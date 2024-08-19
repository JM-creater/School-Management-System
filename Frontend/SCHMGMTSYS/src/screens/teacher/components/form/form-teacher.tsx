import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { TeacherData } from "../../data/teachers";
import { onFinishFailed } from "../../context/exception/finish-failed";
import { ModalAddTeacherProps, ModalEditTeacherProps } from "../../context/props/teacher-props";

export const TeacherAddForm: React.FC<ModalAddTeacherProps> = ({ form, createNewTeacher, classes }) => {
    return (
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
    )
};

export const TeacherEditForm: React.FC<ModalEditTeacherProps> = ({ form, handleEdit, classes }) => {
    return (
        <Form  
          form={form}
          layout="vertical" 
          onFinish={handleEdit}
          // onFinishFailed={onFinishFailed}
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
    )
}