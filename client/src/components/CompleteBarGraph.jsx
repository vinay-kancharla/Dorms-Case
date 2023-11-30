import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CompleteBarGraph = ({ data, title }) => {
  const sortedData = Array.isArray(data) ? data.sort((a, b) => b.rating - a.rating) : [];

  const barChartData = {
    labels: sortedData.map(item => item.dorm),
    datasets: [
      {
        data: sortedData.map(item => item.rating),
        backgroundColor: 'rgba(75, 100, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1.5,
      },
    ],
  };

  const chartDesign = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false, 
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${title} Dorm Ratings`,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '550px', width: '1000px', margin: 'auto', marginTop: '50px'}}>
      <Bar data={barChartData} options={chartDesign} />
    </div>
  );
};

export default CompleteBarGraph;

