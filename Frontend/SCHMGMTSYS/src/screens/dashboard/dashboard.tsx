import React from 'react'
import { StatsCard } from './components/card/stats-card'
import { PieChart } from './components/chart/pie-chart'
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

  return (
    <React.Fragment>
      <StatsCard/>
      <PieChart data={data}/>
    </React.Fragment>
  )
}