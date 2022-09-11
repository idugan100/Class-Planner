import React, { useState,useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'

export default function Create() {
    const [className,setClassName]=useState("");
    const [semester,setSemester]=useState("");
    const [year,setYear]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log({className,semester,year})
        setClassName("");
        setSemester("");
        setYear("");
    }
    const {isAuth,dispatch}=useContext(AuthContext);
    const handleClick=(e)=>{
    dispatch({type:'LOGOUT'})
    }
  return (
    <div>
         <button onClick={handleClick}>Logout</button>
        {isAuth && <p>Logged in</p>}
        {!isAuth && <p>Logged out</p>}
        <h1>Add A Class</h1>
        <form onSubmit={handleSubmit}>
            <label >
                <span>Class Name</span>
                <input type="text" required  onChange={(e)=>{setClassName(e.target.value)}} value={className} />
            </label>
            <label>
                <span>Semester</span>
                <select required  onChange={(e)=>{setSemester(e.target.value)}} value={semester}>
                    <option default value=""></option>
                    <option value="Fall">Fall</option>
                    <option value="Summer">Summer</option>
                    <option value="Spring">Spring</option>
                    <option value="Winter">Winter</option>
                </select>
                <input type="number" required  onChange={(e)=>{setYear(parseInt(e.target.value))}} value={year}/>
            </label>
            <button type='submit'>Create</button>

        </form>
    </div>

  )
}
