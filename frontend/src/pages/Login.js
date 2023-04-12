import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false);
    const {dispatch3}=useContext(AuthContext);
    const handleLogin=async()=>{
        setError();
        setLoading(true);
        const user={email,password};
        const response=await fetch('https://expense-tracker-vsfi.onrender.com/expense/user/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user),
        });
        const json=await response.json();
        if(response.ok){
            dispatch3({
                type: 'LOG_IN',
                payload: json,
            });
            localStorage.setItem('user',JSON.stringify(json));
        }
        if(!response.ok){
            setError(json);
        }
        setLoading(false);
    }
    return (
        <div className='mt-5 font-monospace'>
            <div className='container d-flex justify-content-center align-items-center'>
                <div className="card container shadow">
                    <div className="card-body d-flex justify-content-between flex-column">
                        <h4 className='card-title text-primary'>Log in</h4>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control mb-2' placeholder='Email...'/>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='form-control mb-2' placeholder='Password...'/>
                        {!loading && <button className='btn btn-sm btn-primary w-25' onClick={()=>handleLogin()}>Log in</button>}
                        {loading && <button disabled className='btn btn-sm btn-primary w-25' onClick={()=>handleLogin()}>Log in</button>}
                        {error && <p className='text-danger border border-danger rounded p-2 mt-1'>{error.error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;
