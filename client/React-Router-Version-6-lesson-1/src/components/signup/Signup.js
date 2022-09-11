import React from 'react'
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useFetch} from '../../hooks/useFetch'


export default function Signup() {
    const{isAuth,dispatch}=useContext(AuthContext)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [userName,setUserName]=useState("")
    const { postData, data, error } = useFetch('http://localhost:5000/auth/register', 'POST')
    const handleSubmit=(event)=>{
        event.preventDefault()
        setEmail("");
        setPassword("");
        setUserName("");
        postData({name:userName,email,password});

    }
    //will dispatch LOGIN if request is sucessful!
    useEffect(()=>{
        if(data){
            //TODO store token somewhere
            console.log(data.token)
            dispatch({type:'LOGIN',payload:data.token})
        }

    },[data])
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
        {error && <p>Email is already in use. Plase use another.</p>}
        
    </div>
  )
}
