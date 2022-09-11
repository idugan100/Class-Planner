import { useState,useEffect } from "react"
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import {useFetch} from '../../hooks/useFetch'



export default function Login() {
    const {isAuth,dispatch}=useContext(AuthContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const { postData, data, error } = useFetch('http://localhost:5000/auth/login', 'POST')
    const handleSubmit=(event)=>{
        event.preventDefault()
        
        setEmail("");
        setPassword("");
        postData({email,password});
    }
    useEffect(()=>{
        if(data){
            //TODO store token somewhere
            console.log(data.token)
            dispatch({type:'LOGIN'})
        }
    },[data])
  return (
    <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
        {error && <p>Username or password is incorrect</p>}
    </div>
  )
}
