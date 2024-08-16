import { Col, Form, Input, Row, Select } from "antd";
import { SubjectClassAddProps, SubjectClassEditProps } from "../../context/props/subject-props";
import { SubjectData } from "../../data/subject";
import { onFinishFailed } from "../../../../teacher/context/exception/finish-failed";

export const SubjectAddForm: React.FC<SubjectClassAddProps> = ({ 
    form, 
    createNewSubject,
    teachers
}) => {
    return (
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
    )   
};

export const SubjectEditForm: React.FC<SubjectClassEditProps> = ({ 
    form,
    handleEdit,
    teachers 
}) => {
    return (
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
    )
};