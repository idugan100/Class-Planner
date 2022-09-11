import { useState } from "react"
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";


export default function Login() {
    const {isAuth,dispatch}=useContext(AuthContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log({email,password});
        setEmail("");
        setPassword("");
        dispatch({type:"LOGIN"});
    }
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
        {isAuth && <p>Logged in</p>}
        {!isAuth && <p>Logged out</p>}
    </div>
  )
}
