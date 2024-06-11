import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { VerticalAlignBottom } from '@mui/icons-material';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Tổng chi tiêu từ đầu năm đến nay',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Tháng',
        },
        ticks: {
          autoSkip: false, // Hiển thị tất cả các nhãn trên trục x
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Tổng chi tiêu (VNĐ)',
        },
      },
    },
    barPercentage: 0.8,
  };

export const VerticalBarChart = ({data}) => {
    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          borderWidth: dataset.borderWidth,
          hoverBackgroundColor: dataset.backgroundColor,
          hoverBorderColor: dataset.borderColor,
          hoverBorderWidth: dataset.borderWidth + 2,
          hoverOffset: 4,

          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetIndex = context.datasetIndex;
                const dataIndex = context.dataIndex;
                const count = data.datasets[datasetIndex].count[dataIndex];
                return `${data.datasets[datasetIndex].label}: ${count}`;
              },
            },
          },
        })),
      };
  return (
    <div>
        <Bar data={chartData} options={options}   />
    </div>
  );
};