import React, { createContext, useEffect, useReducer } from 'react';

export const AuthContext=createContext();

export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOG_IN':
            return {
                user: action.payload,
            }
        case 'LOG_OUT':
            return{
                user: null,
            }
        default:
            return state;
    }
}

const AuthContextProvider = (props) => {
    const[auth,dispatch3]=useReducer(authReducer,{
        user: null
    });
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch3({
                type: 'LOG_IN',
                payload: user,
            })
        }
    },[]);
    console.log('auth',auth);
    return (
        <AuthContext.Provider value={{...auth,dispatch3}}>
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;