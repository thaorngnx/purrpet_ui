import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);


const BarChart = ({ chartData }) => {
    
    return <Bar data={chartData} />;
  };

export default BarChart;