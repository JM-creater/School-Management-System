import { Card, Col, Row, Statistic, StatisticProps, Tag, Space, Table } from 'antd'
import React from 'react'
import CountUp from 'react-countup';
import { ButtonContainer, buttonWidthStyles, marginBottomStyles } from '../dashboard/themes/dashboard-styles';
import { PrinterOutlined, UserAddOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { AttendanceButton } from './components/button/button';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

export const AttendanceScreen: React.FC = () => {

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
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
      </Row>
      <ButtonContainer>
        <AttendanceButton 
          label="Print" 
          onClick={handleButtonClick} 
          type="primary" 
          style={{ ...marginBottomStyles, ...buttonWidthStyles }}
          prefix={<PrinterOutlined />}
        />
      </ButtonContainer>
      <Table columns={columns} dataSource={data} />
   </React.Fragment>
  )
}