import { Card, Col, Row, Spin, Statistic, StatisticProps, Table, Select } from 'antd'
import React, { useState } from 'react'
import CountUp from 'react-countup';
import { marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { UserAddOutlined } from '@ant-design/icons';
import { AttendanceTable } from './components/table/table';
import { useAttendance } from '../../hooks/use-attendance';
import { CenteredContainer, ErrorDiv } from '../parents/themes/parents-styles';
import { useStudent } from '../../hooks/use-students';

const { Option } = Select;

export const AttendanceScreen: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );
  const {
    students
  } = useStudent();
  const {
    error,
    loading,
    markedStudents
  } = useAttendance();
  const {
    countAbsent,
    countLate,
    countPresent
  } = useStudent();
  const columns = AttendanceTable();

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredStudents = students.filter(student => {
    if (markedStudents.includes(student.id)) return false; 
    if (!filterStatus) return !student.isAttendance;
    return student.status === filterStatus;
  });

  const hasAttendanceData = students.some(student => student.isAttendance);
  const isSelectDisabled = !hasAttendanceData;

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
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Select
            style={{ width: 200 }}
            placeholder="Filter by status"
            onChange={handleFilterChange}
            allowClear
            disabled={isSelectDisabled}
          >
            <Option value="Present">Present</Option>
            <Option value="Late">Late</Option>
            <Option value="Absent">Absent</Option>
          </Select>
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
};
