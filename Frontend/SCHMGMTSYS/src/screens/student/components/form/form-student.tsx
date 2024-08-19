import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { StudentData } from "../../data/student";
import { StudentAddFormProps, StudentEditFormProps } from "../../context/props/student-props";
import { onFinishFailed } from "../../../teacher/context/exception/finish-failed";

export const StudentAddForm: React.FC<StudentAddFormProps> = ({ 
    form, 
    createNewStudent, 
    parents, 
    classes 
}) => {
    return (
        <Form 
        form={form}
        layout="vertical" 
        onFinish={createNewStudent}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
        <Col span={12}>
          <Form.Item<StudentData>
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Please enter first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<StudentData>
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
          <Form.Item<StudentData>
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please enter date of birth' }]}
          >
            <DatePicker placeholder='Birth Date' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<StudentData>
            name="enrollmentDate"
            label="Enrollment Date"
            rules={[{ required: true, message: 'Please enter enrollment date' }]}
          >
            <DatePicker placeholder='Enrollment Date' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<StudentData>
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please enter gender' }]}
          >
              <Input placeholder="Please enter Gender" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<StudentData>
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
            <Form.Item<StudentData>
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter email' }]}
            >
                <Input placeholder="Please enter Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<StudentData>
              name="parent_id"
              label="Parent"
              rules={[{ required: true, message: 'Please select a parent' }]}
            >
              <Select
                placeholder="Select a parent"
              >
                {
                  parents.map(
                    p => (
                      <Select.Option
                          key={p.id}
                          value={p.id}
                        >
                          {p.firstName} {p.lastName}
                        </Select.Option>
                      )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<StudentData>
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
                <Col span={12}>
                    <Form.Item<StudentData>
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter address' }]}
                    >
                        <Input placeholder="Please enter address" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
};

export const StudentEditForm: React.FC<StudentEditFormProps> = ({ 
    form,
    handleEdit, 
    parents, 
    classes  
}) => {
    return (
        <Form 
            form={form}
            layout="vertical" 
            onFinish={handleEdit}
            // onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item<StudentData>
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name' }]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<StudentData>
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
            <Form.Item<StudentData>
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: 'Please enter date of birth' }]}
            >
                <DatePicker placeholder='Birth Date' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<StudentData>
              name="enrollmentDate"
              label="Enrollment Date"
              rules={[{ required: true, message: 'Please enter enrollment date' }]}
            >
                <DatePicker placeholder='Enrollment Date' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<StudentData>
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please enter gender' }]}
            >
                <Input placeholder="Please enter Gender" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<StudentData>
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
                <Form.Item<StudentData>
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder="Please enter Phone Number" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<StudentData>
                    name="parent_id"
                    label="Parent"
                    rules={[{ required: true, message: 'Please select a parent' }]}
                >
                    <Select
                        placeholder="Select a parent"
                    >
                        {
                            parents.map(
                                p => (
                                    <Select.Option
                                        key={p.id}
                                        value={p.id}
                                    >
                                        {p.firstName} {p.lastName}
                                    </Select.Option>
                                )
                            )
                        }
                    </Select>
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
                <Col span={12}>
                    <Form.Item<StudentData>
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
                <Col span={12}>
                    <Form.Item<StudentData>
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter address' }]}
                    >
                        <Input placeholder="Please enter address" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
};