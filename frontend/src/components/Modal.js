import React,{useEffect, useState} from 'react';
import { useContext } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { ExpenseTotalContext } from '../contexts/ExpenseTotalContext';
import { AuthContext } from '../contexts/AuthContext';

const Modal = () => {
    const {dispatch1}=useContext(ExpenseContext);
    const {user}=useContext(AuthContext);
    const {dispatch2,dispatch4}=useContext(ExpenseTotalContext);
    const select=[
        'Food & Beverage','Transportation','Rentals','Water Bill','Phone Bill','Electricity Bill','Gas Bill','Television Bill','Internet Bill','Other Utility Bills','Home Maintenance','Vehicle Maintenance','Medical Check Up','Insurances','Education','Houseware','Personal Items','Pets','Home Services','Other Expense','Fitness','Makeup','Gifts & Donations','Streaming Service','Fun Money','Investment','Pay Interest','Outgoing Transfer'
    ];
    const incomeSelect=[
        'Salary','Profit Income','Interest Income','Investments Gains','Rental Gains','Gifts','Allowance/PocketMoney','Others',
    ]
    const[name,setName]=useState();
    const[category,setCategory]=useState();
    const[amount,setAmount]=useState();
    const[type,setType]=useState();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!user){
            return;
        }
        const exp={name,category,amount,flow: type};
        const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/tracker',{
            method: 'POST',
            body: JSON.stringify(exp),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        });
        const json=await response.json();
        if(response.ok){
            dispatch1({
                type: 'CREATE_EXPENSE',
                payload: json,
            });
            if(json.flow==='Transaction'){
                dispatch2({
                    type: 'ADD_TOTAL',
                    payload: json.amount,
                })
            }
            if(json.flow==='Income'){
                dispatch4({
                    type: 'ADD_BALANCE',
                    payload: json.amount
                })
            }
        }
        if(!response.ok){
            window.alert('Error Adding');
        }
        setName('');
        setAmount('');
    }
    const [selectTrue,setSelectTrue]=useState(false);
    const handleSelect=()=>{
        if(type!=='Transaction'){
            setSelectTrue(true);
            setCategory('Salary');
        }
        if(type==='Transaction'){
            setSelectTrue(false);
            setCategory('Food & Beverage');
        }
    }
    useEffect(()=>{
        setName('');
        setCategory('Food & Beverage');
        setAmount('');
        setType('Transaction');
    },[]);
    return (
        <div className='modal fade' id='newModal' tabIndex="-1" aria-labelledby='newModalLabel' aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>Add transaction</h5>
                    </div>
                    <div class="modal-body">
                        <div className='d-flex justify-content-between'>
                            <div className='form-floating flex-grow-1 mb-3 me-2'>
                                <select className='form-control' onChange={(e)=>{setType(e.target.value);handleSelect();}}  id='floatingName' value={type}  required>
                                    <option value="Transaction">Transaction</option>
                                    <option value="Income">Income</option>
                                    </select>
                                <label for="floatingName text-secondary">Flow</label>
                            </div>
                            <div className='form-floating flex-grow-1 mb-3 me-2'>
                                <select className='form-control' id='floatingCatg' value={category} onChange={(e)=>setCategory(e.target.value)} required>
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
                            <div className='form-floating flex-grow-1 mb-3 me-2'>
                                <input className='form-control' id='floatingCatg' type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
                                <label for="floatingCatg">Note</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around'>
                            <div className="form-floating flex-grow-1 mb-3">
                                <input id='floatingAmt'  className='form-control' type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
                                <label for="floatingAmnt">Amount</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm px-3" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={handleSubmit} type="button" data-bs-dismiss="modal" class="btn btn-success btn-sm px-3">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Modal;
