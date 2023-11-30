import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Podium = ({ title }) => {
  const [rankings, setRankings] = useState([])
  const [topThreeData, setTopThreeData] = useState()
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    async function getRating() {
      try {
        const response = await fetch(`http://localhost:8080/api/dorm/getAllRanked?experience=${title}`);
        if(response.ok){
          const data = await response.json();
          console.log("data",data)
          setTopThreeData(data);
        } else {
          console.log("not okay getting all ranked");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getRating();
  }, [title]);
  const truncateLabel = (label, maxLength = 10) => {
    if(label.length > maxLength){
      let parts = label.split(" ")
      if(parts.includes("Village")){
        let newparts = [parts[parts.length - 2],parts[parts.length - 1]]
        return newparts.join(" ")
      } else {
        let  newparts = [parts[0],parts[1]]
        return newparts.join(" ")
      }
    } else {
      return label 
    }
    return label.length > maxLength ? `${label.substring(0, maxLength - 3)}...` : label;
  };

  useEffect(() => {
    console.log("here")
    if (Array.isArray(topThreeData) && topThreeData.length >= 3) {
      console.log("dsjnfkjdsnf",topThreeData)
      let rankedData = [topThreeData[1],topThreeData[0],topThreeData[2]]
      const newChartData = {
        labels: rankedData.map(item => truncateLabel(item.name)),
        datasets: [
          {
            data: rankedData.map(item => item.averageRating),
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
      console.log("new data", newChartData)
      setChartData(newChartData);
      console.log("sdas",chartData)
      const newChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
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
      setChartOptions(newChartOptions);
    }
  }, [topThreeData]);

  


  return (
    <div style={{ margin: '10px', width: '400px', height: '500px' }}>
      {console.log(chartData)}
      {(Array.isArray(topThreeData) && (Object.keys(chartData).length > 0)) && 
      <Bar data={chartData} options={chartOptions} />}

    </div>
  );
};

export default Podium;
