import { UserAddOutlined } from "@ant-design/icons";
import { Card, Col, Row, Select, Statistic, StatisticProps } from "antd";
import { marginBottomStyles } from "../../../dashboard/themes/dashboard-styles";
import CountUp from "react-countup";
import { AttendanceCardProps } from "./props/attendance-card-props";
import { SelectContainer } from "../../styles/select-container";
import React from "react";

const { Option } = Select;

export const AttendanceCard: React.FC<AttendanceCardProps> = ({ 
    countPresent, 
    countLate,
    countAbsent,
    isSelectDisabled,
    handleFilterChange
}) => {
    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," />
    );
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
                    <SelectContainer>
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
                    </SelectContainer>
                </Col>
            </Row>
        </React.Fragment>
    )
};