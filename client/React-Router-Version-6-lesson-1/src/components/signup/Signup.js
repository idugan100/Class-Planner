import React from 'react'
import { useState, useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';


export default function Signup() {
    const{isAuth,dispatch}=useContext(AuthContext)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [userName,setUserName]=useState("")
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log({email,password,userName});
        setEmail("");
        setPassword("");
        setUserName("");
        dispatch({type:'LOGIN'})
    }
  return (
    <div className="login">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
        <label>
                <span>User Name</span>
                <input type="text" required onChange={(e)=>{setUserName(e.target.value)}} value={userName}/>
        </label>
            <label>
                <span>Email</span>
                <input type="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            </label>
            <button type="submit">Login</button>
        </form>
        {isAuth && <p>Logged in</p>}
        {!isAuth && <p>Logged out</p>}
    </div>
  )
}
