import { Card, Col, Row, Spin, Statistic, StatisticProps, Table } from 'antd'
import React from 'react'
import CountUp from 'react-countup';
import { marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { UserAddOutlined } from '@ant-design/icons';
import { AttendanceTable } from './components/table/table';
import { useAttendance } from '../../hooks/use-attendance';
import { CenteredContainer, ErrorDiv } from '../parents/themes/parents-styles';
import { useStudent } from '../../hooks/use-students';

export const AttendanceScreen: React.FC = () => {

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );
  const {
    students
  } = useStudent();
  const {
    error,
    loading
  } = useAttendance();
  const {
    countAbsent,
    countLate,
    countPresent
  } = useStudent();
  const columns = AttendanceTable();

  const filteredStudents = students.filter(student => !student.isAttendance);

  return (
   <React.Fragment>
     <Row gutter={16}>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Present"
            value={countPresent}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Late"
            value={countLate}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Absent"
            value={countAbsent}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      </Row>
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
              <Table 
                columns={columns} 
                dataSource={filteredStudents} 
              />
            </React.Fragment>
          )
        }
      </React.Fragment>
   </React.Fragment>
  )
}