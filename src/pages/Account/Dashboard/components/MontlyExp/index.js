import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { Animation } from '../../../components';
const { FadeInRight, FadeInLeft } = Animation
defaults.global.legend.labels = false;

const options ={
  scales: {
    xAxes: [{
      gridLines: {
        offsetGridLines: true,
        display: false
      }
    }],
    yAxes: [{
      gridLines: {
        display: true
      }
    }],
  }
};
const MonthlyExpenditure = ({ expenditures }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Invested",
        data: expenditures.invested,
        fill: true,
        backgroundColor: "#069801",
        borderColor: "rgba(75,192,192,1)",
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 2,
      },
      {
        label: "Withdrawn",
        data: expenditures.withdrawn,
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 2,
        backgroundColor: '#FF7A00',
        borderColor: "#FF7A00"
      }
    ]
  };

  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md margin-bottom-md bg-white expenditure overflow-h">
      <div className="d-flex justify-content-s-between slim-border-bottom padding-vertical-sm">
        <FadeInLeft duration={.1}>
          <h2 className="font-weight-500 font-style-normal font-lg">Monthly Expenditure</h2>
        </FadeInLeft>
        <FadeInRight>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center margin-right-sm">
              <div className="indicator green margin-right-sm" />
              <span className="font-sm font-weight-500">Deposited</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="indicator orange margin-right-sm" />
              <span className="font-sm font-weight-500">Withdrawn</span>
            </div>
          </div>
        </FadeInRight>
      </div>
      <section className="linear-graph">
        <Bar data={data} options={options} height={150} />
      </section>
    </section>
  )
}

export default MonthlyExpenditure