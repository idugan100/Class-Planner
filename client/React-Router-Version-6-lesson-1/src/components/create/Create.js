import React, { useState,useContext } from 'react'

import {AuthContext} from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch';
import './Create.css'

export default function Create() {
    const [className,setClassName]=useState("");
    const [semester,setSemester]=useState("");
    const [year,setYear]=useState("");
    const {data,isPending,error,postData}=useFetch('http://localhost:5000/dashboard/classes',"POST")
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log({className,semester,year})
        postData({className,semester,year})
        setClassName("");
        setSemester("");
        setYear("");
    }
    const {isAuth,dispatch}=useContext(AuthContext);
  
  return (
    <div className='create'>
         
        
        <div className='heading-wrapper'><h1>Add A Class</h1></div>
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
