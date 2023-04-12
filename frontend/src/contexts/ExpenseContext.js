import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

export const ExpenseContext=createContext();

export const expenseReducer=(state,action)=>{
    switch(action.type){
        case 'SET_EXPENSE':
            return {
                data: action.payload
            }
        case 'CREATE_EXPENSE':
            return {
                data: [action.payload,...state.data]
            }
        case 'REMOVE_EXPENSE':
            return {
                data: state.data.filter(item=>item._id!==action.payload)
            }
        default:
            return state;
    }
}

const ExpenseContextProvider = (props) => {
    const[expense,dispatch1]=useReducer(expenseReducer,{
        data: null
    });
    return (
        <ExpenseContext.Provider value={{...expense,dispatch1}}>
            {props.children}
        </ExpenseContext.Provider>
    );
}
 
export default ExpenseContextProvider;