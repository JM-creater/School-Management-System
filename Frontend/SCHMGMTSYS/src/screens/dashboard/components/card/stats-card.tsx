import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';
import { UserAddOutlined } from '@ant-design/icons';
import { marginBottomStyles } from '../../themes/dashboard-styles';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);

export const StatsCard: React.FC = () => (
  <React.Fragment>
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={true} style={marginBottomStyles}>
          <Statistic
            title="Text Here"
            value={328472837}
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
            title="Text Here"
            value={328472837}
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
            title="Text Here"
            value={328472837}
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
            title="Text Here"
            value={328472837}
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
            title="Text Here"
            value={328472837}
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
            title="Text Here"
            value={328472837}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserAddOutlined />}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  </React.Fragment>
);
  