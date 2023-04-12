import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {Chart as Chart} from 'chart.js/auto';

const BarChart = ({userData}) => {
    return (
       <Bar data={userData}></Bar> 
    );
}
 
export default BarChart;