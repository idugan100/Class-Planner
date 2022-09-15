import React, { useState } from 'react'
import {useContext,useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { useData } from '../../hooks/useData'
import './Dashboard.css'
export default function Dashboard() {
    //get data from api
    

const {isAuth,token,dispatch}=useContext(AuthContext);
const [reload,setReload]=useState("");


    //const{data:info,error,isPending}=useData('http://localhost:5000/dashboard');

const {data:classes,isPending}=useData('http://localhost:5000/dashboard/classes')

const [array,setArray]=useState([]);
useEffect(()=>{
    if(classes){
        setArray(Object.values(classes))
        
    }
},[classes])



 

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
                    <button>Delete</button>

                </div>
            ))
            
        }
        </div>
            
                
            

            
        
    </div>
  )
}
