import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

export const ExpenseTotalContext=createContext();

export const totalReducer=(state,action)=>{
    switch(action.type){
        case 'SET_TOTAL':
            return {
                total: action.payload
            }
        case 'ADD_TOTAL':
            return{
                total: state.total+action.payload
            }
        case 'MINUS_TOTAL':
            return {
                total: state.total-action.payload
            }
        default:
            return state;
    }
}

export const balanceReducer=(state,action)=>{
    switch(action.type){
        case 'SET_BALANCE':
            return {
                balance: action.payload,
            }
        case 'REMOVE_BALANCE':
            return {
                balance: state.balance-action.payload
            }
        case 'ADD_BALANCE':
            return {
                balance: state.balance+action.payload
            }
        default:
            return state;
    }
}

const ExpenseTotalContextProvider = (props) => {
    const[totalexp,dispatch2]=useReducer(totalReducer,{
        total: 0,
    })
    const[remains,dispatch4]=useReducer(balanceReducer,{
        balance: 0,
    })
    return (
        <ExpenseTotalContext.Provider value={{...totalexp,dispatch2,...remains,dispatch4}}>
            {props.children}
        </ExpenseTotalContext.Provider>
    );
}
 
export default ExpenseTotalContextProvider;