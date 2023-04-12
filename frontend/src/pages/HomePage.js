import React, { useEffect, useState } from 'react';
import BarChartHolder from '../components/BarChartHolder';
import { useContext } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { ExpenseTotalContext } from '../contexts/ExpenseTotalContext';
import { Link } from 'react-router-dom';
import ListView from '../components/ListView';
import {ResponsiveContainer,Area,AreaChart,Tooltip,LineChart,Line,XAxis,YAxis,CartesianGrid} from 'recharts';
import { AuthContext } from '../contexts/AuthContext';
import format from 'date-fns/format';
import { BalanceContext } from '../contexts/BalanceContext';
import Rupee from '../components/Rupee';
import { Alert } from 'bootstrap';

const HomePage = () => {
    const {data,dispatch1}=useContext(ExpenseContext);
    const {dispatch2,balance,dispatch4}=useContext(ExpenseTotalContext);
    const [isloading,setisloading]=useState(true);
    const {user}=useContext(AuthContext);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker',{
                headers:{
                    'Authorization': `Bearer ${user.token}`,
                }
            })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    dispatch1({
                        type: 'SET_EXPENSE',
                        payload: data,
                    });
                    setisloading(false);
                    return data;
                })
                .catch(err=>{
                    window.alert('Error loading data');
                });
                countBalance(response);
        }
        fetchData();
    },[]);
    const handleClick=async(item)=>{
        const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker/'+item._id,{
            method: 'DELETE',
        });
        if(response.ok){
            dispatch1({type: 'REMOVE_EXPENSE',payload: item._id});
            dispatch2({type: 'MINUS_TOTAL',payload: item.amount});
        }
    }
    const countBalance=(res)=>{
        var y=0;
        var x=0;
        res.map(item=>{
            y=y+item.amount;
            if(item.flow==='Transaction'){
                x+=item.amount;
            }
            return item;
        })
        const bal=y-x;
        if(y<0){
            y*=-1;
        }
        dispatch4({
            type: 'SET_BALANCE',
            payload: bal,
        })
        dispatch2({
            type: 'SET_TOTAL',
            payload: x,
        })
    }
    const Millify=(value)=>{
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "k", "M", "B","T"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }
    return (
        <div className='font-monospace'>
            {isloading && <div className='mt-5'>
                <div class="mt-5 d-flex justify-content-center align-items-center">
                <h3 className='text-primary me-3'>Loading</h3>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
        </div>
        </div>
                </div>}
            {!isloading && <div>
            <ListView data={data} ></ListView>
            <div className='h-100 d-sm-flex flex-row justify-content-between font-monospace'>
            <div className='card flex-grow-1 m-3'>
                <div className='card-body shadow-sm'>
                    <div className="card-title d-flex justify-content-between align-items-end">
                        <h5 className='text-primary' >Recent Transactions</h5>
                        <Link to='/transactions' className='' style={{textDecorationLine: 'none'}}><h5><span className='badge bg-primary'>View All</span></h5></Link>
                    </div>
                    <table className='table table-sm table-borderless'>
                        <thead className='shadow-sm'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Date</th>
                                {/* <th scope='col'>Time</th> */}
                                <th scope='col'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.slice(0,8).map(item=>{
                                return (
                                    <tr className='border-bottom'>
                                        <th scope='row' className='text-truncate'>{item.name}</th>
                                        <td className='d-flex align-items-center'><Rupee hw={15}></Rupee>{Millify(item.amount)}</td>
                                        <td>{item.category}</td>
                                        <td>{format(new Date(item.createdAt),'dd/MM/yyyy')}</td>
                                        {/* <td>{format(new Date(item.createdAt),'kk:mm:ss')}</td> */}
                                        {item.flow==='Transaction' && <td><h6><span className='badge bg-danger'>{item.flow}</span></h6></td>}
                                        {item.flow==='Income' && <td><h6><span className='badge bg-success'>{item.flow}</span></h6></td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>}
        </div>
    );
}
 
export default HomePage;
