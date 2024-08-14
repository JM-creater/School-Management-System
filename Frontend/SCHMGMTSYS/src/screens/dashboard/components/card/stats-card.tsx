import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';
import { UserAddOutlined } from '@ant-design/icons';
import { marginBottomStyles } from '../../themes/dashboard-styles';
import { useStudent } from '../../../../hooks/use-students';
import { useTeacher } from '../../../../hooks/use-teacher';
import { useParent } from '../../../../hooks/use-parent';
import { useSubject } from '../../../../hooks/use-subject';
import { useClass } from '../../../../hooks/use-class';

export const StatsCard: React.FC = () => {
  
  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );
  const {
    overAllStudent
  } = useStudent();
  const {
    overAllTeachers
  } = useTeacher();
  const {
    overAllParent
  } = useParent();
  const {
    overAllSubject
  } = useSubject();
  const {
    overAllClass
  } = useClass();

  return (
  <React.Fragment>
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Total Students"
            value={overAllStudent} 
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Total Teachers"
            value={overAllTeachers}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Total Subjects"
            value={overAllSubject}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>     
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Total Classes"
            value={overAllClass}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Total Parents"
            value={overAllParent}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  </React.Fragment>
  )
};
  