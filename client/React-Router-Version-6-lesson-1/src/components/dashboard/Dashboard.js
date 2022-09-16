import React, { useState } from 'react'

import {useContext,useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'

import { useData } from '../../hooks/useData'
import './Dashboard.css'
export default function Dashboard() {
    //get data from api
    

const {isAuth,token,dispatch}=useContext(AuthContext);



    
//const{data:info,error,isPending}=useData('http://localhost:5000/dashboard')
    const{data:classes,setReload}=useData('http://localhost:5000/dashboard/classes')


const [array,setArray]=useState([]);



const handleClick=async(id)=>{
    
    const options={
        method:"DELETE",
        headers:{
        "Content-type":"application/json",
        "token":token
        },
        body:JSON.stringify({id})
    }
    const res= await fetch('http://localhost:5000/dashboard/classes',{
        headers:{"Content-type":"application/json","token":token},method:"DELETE",
        body:JSON.stringify({id})
    })
    if(res.ok){
        //updates by refetching the data because reload is a useEffect dependency of useData
        setReload("reload")
        
        
    }

}



 

  return (
    <div >
        
        

        
        <h1>Dashboard</h1>
        <div className='card-wrapper'>
        {classes &&
            
            Object.values(classes).map((item)=>(
                <div key ={item.id}className='card'>
                    <h3>{item.classname}</h3>
                    <p>{item.semester}</p>
                    <p>{item.year}</p>
                    <button onClick={()=>{handleClick(item.id)}}>Delete</button>

                </div>
            ))
            
        }
        
        </div>
            
                
            

            
        
    </div>
  )
}
