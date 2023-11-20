import React from "react";
import { Doughnut } from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto'

ChartJS.register(CategoryScale)
interface DonutsProps{
    data: any
}
const DonutChartComponent = ({ data }: DonutsProps) => {
  const options = {
    responsive: true,
  };

  return (
    <div className={"h-[80%]"}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChartComponent;
