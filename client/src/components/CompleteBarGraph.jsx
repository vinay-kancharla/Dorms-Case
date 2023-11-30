import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
Chart.register(...registerables);

const CompleteBarGraph = ({ data, title }) => {
  // const sortedData = Array.isArray(data) ? data.sort((a, b) => b.rating - a.rating) : [];
  const [chartDesign,setChartDesign] = useState() 
  const [rankings, setRankings] = useState([])
  const [barChartData, setBarCharData] = useState([])

  // const barChartData = {
  //   labels: sortedData.map(item => item.dorm),
  //   datasets: [
  //     {
  //       data: sortedData.map(item => item.rating),
  //       backgroundColor: 'rgba(75, 100, 192, 0.7)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1.5,
  //     },
  //   ],
  // };

  
  useEffect(() => {
    console.log("title", title)
    async function getRankings() {
      try {
        const response = await fetch(`http://localhost:8080/api/dorm/getAllRanked?experience=${title}`);
        if(response.ok){
          const data = await response.json();
          console.log("data",data)
          setRankings(data);
        } else {
          console.log("not okay getting all ranked");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getRankings();
  }, [title]);

  useEffect(() => {
    if (Array.isArray(rankings) && rankings.length > 0) {
    console.log("rankings now are",rankings)
    const newChartDesign = {
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

    setChartDesign(newChartDesign)

    const newBarChartData = {
    labels: rankings.map(item => item.name),
    datasets: [
      {
        data: rankings.map(item => item.averageRating),
        backgroundColor: 'rgba(75, 100, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1.5,
      },
    ],
  };
    setBarCharData(newBarChartData)
  }

  },[rankings])



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '550px', width: '1000px', margin: 'auto', marginTop: '50px'}}>
      {console.log("bar chart data",barChartData)}
      {console.log(" chart design",chartDesign)}
      {(Array.isArray(rankings) && rankings.length > 0 && (Object.keys(barChartData).length > 0) ) && 
      <Bar data={barChartData} options={chartDesign} />}
    </div>
  );
};

export default CompleteBarGraph;

