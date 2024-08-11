import React from 'react'
import { StatsCard } from './components/card/stats-card'
import { PieChart } from './components/chart/pie-chart'
import { DashboardButton } from './components/button/button';
import {  ButtonContainer, buttonWidthStyles, marginBottomStyles } from './themes/dashboard-styles';
import { PrinterOutlined } from '@ant-design/icons';

const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

export const DashboardScreen: React.FC = () => {

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <React.Fragment>
      <ButtonContainer>
        <DashboardButton 
          label="Print" 
          onClick={handleButtonClick} 
          type="default" 
          style={{ ...marginBottomStyles, ...buttonWidthStyles }}
          prefix={<PrinterOutlined />}
        />
      </ButtonContainer>
      <StatsCard/>
      <PieChart data={data}/>
    </React.Fragment>
  )
}