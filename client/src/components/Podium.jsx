import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Podium = ({ data, title }) => {
  const sortedData = Array.isArray(data) ? data.sort((a, b) => b.rating - a.rating) : [];
  const topThreeData = sortedData.slice(0, 3);

  const rankedData = [
    topThreeData[1], 
    topThreeData[0], 
    topThreeData[2], 
  ];

  const chartData = {
    labels: rankedData.map(item => item.dorm),
    datasets: [
      {
        data: rankedData.map(item => item.rating),
        backgroundColor: [
          'rgba(192, 192, 192, 0.8)', 
          'rgba(255, 223, 132, 0.9)', 
          'rgba(205, 127, 50, 0.8)',  
        ],
        borderColor: [
          'rgba(192, 192, 192, 1)',
          'rgba(255, 223, 132, 1)',
          'rgba(205, 127, 50, 1)',
        ],
        borderWidth: 1,
        barPercentage: 1.25, 
        categoryPercentage: 0.8, 
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        display: false,
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
    maintainAspectRatio: false, 
    responsive: true, 
  };

  return (
    <div style={{ margin: '10px', width: '400px', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />

    </div>
  );
};

export default Podium;
