import React,{useState} from 'react';
import BarChart from './BarChart';

const BarChartHolder = ({data}) => {
    const [userData,setUserData]=useState({
        labels: data.map((item)=>item.createdAt),
        datasets: [{
            label: "Transaction Details",
            data: data.map((item)=>item.amount),
        }]
    });
    return (
        <BarChart userData={userData} ></BarChart>
    );
}
 
export default BarChartHolder;