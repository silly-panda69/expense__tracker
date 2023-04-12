import React, { createContext, useReducer } from 'react';

export const BalanceContext=createContext();

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

const BalanceContextProvider = (props) => {
    const[remains,dispatch4]=useReducer(balanceReducer,{
        balance: 0,
    })
    return (
        <BalanceContext.Provider value={{...remains,dispatch4}}>
            {props.children}
        </BalanceContext.Provider>
    );
}
 
export default BalanceContextProvider;