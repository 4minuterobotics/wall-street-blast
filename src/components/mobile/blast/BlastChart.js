import React from 'react';
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// DATA
const width  = window.innerWidth || 
  document.documentElement.clientWidth || 
  document.body.clientWidth;
const height = window.innerHeight || 
  document.documentElement.clientHeight || 
  document.body.clientHeight;

// CONFIG
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend, 
    ChartDataLabels
);
ChartJS.defaults.font.family = "'8bit'";
ChartJS.defaults.color = "#FFFFFF";
ChartJS.defaults.scale.ticks.stepSize = 0.1;
ChartJS.defaults.layout.padding = {
  top: height*0.04,
  left: width*0.04,
  right: width*0.01
}

const BlastChart = (props) => {
  let labels = props.gameState.labels
  let values = Object.values(props.gameState.blasts);
  let end = Math.ceil(Math.max(Math.max(...values), 3));
  let start = end===3 ? 1 : Math.floor(Math.min(...values));
  let mid = Math.floor((end-start)/2);
  let scaleMin = end===3 ? 0.8 : start*0.8;

  const options = {
    responsive: true,
    elements: { bar: {} },
    plugins: {
      legend: { display: false },
        datalabels: {
          color: '#000000', 
          font: {size: height*0.014},
          formatter: function (value, context) {
            return `${value.toFixed(1)}x`
          },
          anchor: 'start',
          align: 'end',
          offset: -3,
          clamp: true,
        }
    },
    scales: {
      y: {
        min: scaleMin,
        max: Math.max(3, end),
        ticks: {
          font: {size: "6px"},
          callback: function(value, index, ticks) {
            switch(value) {
              case start:
              case start + mid:
              case end:
                return value;
              default:
                return null;
            };
          },
        }
      },
      x: { 
        ticks: {
          font: {size: "12px"},
          crossAlign: "far"
        }
      }
    }
  };
  
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: function(context) {
          const idx = context.dataIndex;
          const val = context.dataset.data[idx];
          if (val<=1) {
            return '#fe4500'
          } else if (!props.gameState.busted[labels[idx]]) {
            return '#02f354'
          } 
          else {
            return '#fe4500'
          };
        },
      }
    ],
  };

  return <Bar height={height*0.28} width={width*0.9} options={options} data={data}/>
};

export default BlastChart