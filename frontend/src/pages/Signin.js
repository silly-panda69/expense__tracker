import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Signin = () => {
    const [email,setEmail]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const {dispatch3}=useContext(AuthContext);
    const handleLogin=async()=>{
        setLoading(true);
        const user={username,email,password};
        const response=await fetch('/expense/user/signup',{
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
                        <h4 className='card-title text-primary'>Sign In</h4>
                        <input type="text" onChange={e=>setUsername(e.target.value)} value={username} className='form-control mb-2' placeholder='Username'/>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control mb-2' placeholder='Email...'/>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='form-control mb-2' placeholder='Password...'/>
                        {!loading && <button className='btn btn-sm btn-primary w-25' onClick={()=>handleLogin()}>Sign in</button>}
                        {loading && <button disabled className='btn btn-sm btn-primary w-25' onClick={()=>handleLogin()}>Sign in</button>}
                        {error && <p className='text-danger border border-danger rounded p-2 mt-1'>{error.error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Signin;