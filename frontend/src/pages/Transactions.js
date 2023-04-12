import React, { useContext,useEffect,useState } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { ExpenseTotalContext } from '../contexts/ExpenseTotalContext';
import { AuthContext } from '../contexts/AuthContext';
import {format} from'date-fns';
import Rupee from '../components/Rupee';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle';

const Transactions = () => {
    const {data,dispatch1}=useContext(ExpenseContext);
    const {total,dispatch2,dispatch4}=useContext(ExpenseTotalContext);
    const {user}=useContext(AuthContext);
    const[name,setName]=useState();
    const[category,setCategory]=useState();
    const[amount,setAmount]=useState();
    const select=[
        'Food & Beverage','Transportation','Rentals','Water Bill','Phone Bill','Electricity Bill','Gas Bill','Television Bill','Internet Bill','Other Utility Bills','Home Maintenance','Vehicle Maintenance','Medical Check Up','Insurances','Education','Houseware','Personal Items','Pets','Home Services','Other Expense','Fitness','Makeup','Gifts & Donations','Streaming Service','Fun Money','Investment','Pay Interest','Outgoing Transfer'
    ];
    const [selectTrue,setSelectTrue]=useState();
    const[wallet,setWallet]=useState();
    const fetchData=async()=>{
        await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker',{
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
                return data;
            })
            .catch(err=>{
                window.alert('Error Getting Data');
            });
    }
    useEffect(()=>{
        if(!user){
            return;
        }
        fetchData();
    },[]);
    const handleDelete=async(item)=>{
        if(!user){
            return;
        }
        const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker/'+item._id,{
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`,
            }
        });
        if(response.ok){
            const json=await response.json();
            dispatch1({type: 'REMOVE_EXPENSE',payload: json._id});
            if(json.flow==='Transaction'){
                dispatch2({type: 'MINUS_TOTAL',payload: json.amount});
            }
            if(json.flow==='Income'){
                dispatch4({type: 'REMOVE_BALANCE',payload: json.amount});
            }
        }
        if(!response.ok){
            window.alert('Error Updating');
        }
    }
    const incomeSelect=[
        'Salary','Profit Income','Interest Income','Investments Gains','Rental Gains','Gifts','Allowance/PocketMoney','Others',
    ]
    const handleSelect=()=>{
        if(wallet!=='Transaction'){
            setSelectTrue(true);
        }
        if(wallet==='Transaction'){
            setSelectTrue(false);
        }
    }
    const handleSubmit=async(item)=>{
        const exp={name,category,amount,flow: wallet};
        const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker/'+item._id,{
            method: 'PATCH',
            body: JSON.stringify(exp),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        });
        if(response.ok){
            fetchData();
        }
        if(!response.ok){
            window.alert('Error Updating');
        }
    }
    const handleOpen=(item)=>{
        setAmount(item.amount);
        if(item.category!=='Transaction'){
            setSelectTrue(true);
        }
        if(item.category==='Transaction'){
            setSelectTrue(false);
        }
        setCategory(item.category);
        setName(item.name);
        setWallet(item.flow);
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
        <div>
            <div className='m-3  font-monospace'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='flex-grow-1'>
                    <h4 className='my-3'>All Transactions</h4>
                </div>
            </div>
            <div>
                <table className="table table-borderless">
                    <thead className='bg-light shadow-sm'>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Time</th>
                            <th scope='col'>Status</th>
                            <th scope='col'> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item=>{
                            return(
                                <tr key={item._id} className='border-bottom'>
                                    <th scope='row' className='text-truncate'>{item.name}</th>
                                    <td className='d-flex align-items-center'><Rupee hw={15}></Rupee>{Millify(item.amount)}</td>
                                    <td>{item.category}</td>
                                    <td>{format(new Date(item.createdAt),'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(item.createdAt),'kk:mm:ss')}</td>
                                    {item.flow==='Transaction' && <td><h6><span className='badge bg-danger'>{item.flow}</span></h6></td>}
                                    {item.flow==='Income' && <td><h6><span className='badge bg-success'>{item.flow}</span></h6></td>}
                                    <td >
                                        <div className="dropdown">
                                            <button className='btn btn-sm dropdown-toggle'  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg></button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">                                          
                                                <li><a data-bs-toggle="modal" data-bs-target={"#edit"+item._id} class="dropdown-item" onClick={()=>handleOpen(item)}>Edit</a></li>
                                                <li><a data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+item._id} class="dropdown-item">Delete</a></li>
                                            </ul>
                                            <div class="modal fade" id={"staticBackdrop"+item._id} tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="staticBackdropLabel">Are you sure you want to delete this transaction?</h5>
                                                        </div>
                                                        <div class="modal-body">
                                                            This will delete this transaction permanently. You cannot undo this action.
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                            <button onClick={()=>handleDelete(item)} data-bs-dismiss="modal" type="button" class="btn btn-sm btn-danger">Delete</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div class="modal fade" id={"edit"+item._id} tabindex="-1" aria-labelledby="edit" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg modal-dialog-centered">
                                                    <div class="modal-content">
                    <div class="modal-header">
                        <h5>Edit transaction</h5>
                    </div>
                    <div class="modal-body">
                        <div className='d-flex justify-content-between'>
                            <div className='form-floating  mb-3 me-2'>
                                <select className='form-control'  id='floatingName' onChange={(e)=>{setWallet(e.target.value);handleSelect()}} value={wallet} required>
                                    <option value="Transaction">Transaction</option>
                                    <option value="Income">Income</option>
                                    </select>
                                <label for="floatingName text-secondary">Type</label>
                            </div>
                            <button>
                            <div className='form-floating flex-grow-1 mb-3 me-2'>
                                <select className='form-control' id='floatingCatg' value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                    <option selected disabled>Select Category</option>
                                    {!selectTrue && select.map((item)=>{
                                        return (
                                            <option className='text-truncate' value={item}>{item}</option>
                                        );
                                    })}
                                    {selectTrue && incomeSelect.map((item)=>{
                                        return (
                                            <option className='text-truncate' value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                                <label for="floatingCatg">Category</label>
                            </div>
                            </button>
                            <div className='form-floating flex-grow-1 mb-3 me-2'>
                                <input className='form-control' id='floatingCatg' type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
                                <label for="floatingCatg">Note</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around'>
                            <div className="form-floating flex-grow-1 mb-3 me-2">
                                <input id='floatingAmt'  className='form-control' type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
                                <label for="floatingAmnt">Amount</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm px-3" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={()=>handleSubmit(item)} type="button" data-bs-dismiss="modal" class="btn btn-success btn-sm px-3">Save</button>
                    </div>
                </div>
                                                    </div>
                                            </div>   
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}
 
export default Transactions;
