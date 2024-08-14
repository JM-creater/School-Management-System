import { Col, Row } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { spaceBetweenStyles } from '../../themes/dashboard-styles';
import { PieChartProps } from './props/chart-props';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ data, options }: PieChartProps) {
  return (
    <React.Fragment>
      <Row gutter={16} justify='center' style={spaceBetweenStyles}>
        <Col span={8}>
          <h2 style={{ textAlign: "center" }}>Class</h2>
          <Pie
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Users Gained between 2016-2020"
                },
                ...(options?.plugins || {})
              }
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
