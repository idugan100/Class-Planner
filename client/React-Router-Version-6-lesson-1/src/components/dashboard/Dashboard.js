import React from 'react'
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

export default function Dashboard() {
    //get data from api
    const data=[{class:"Database",semester:"Fall",year:2022},
    {class:"English 103",semester:"Fall",year:2022},
    {class:"Micro Computers",semester:"Spring",year:2022},
    {class:"SWE 1",semester:"Spring",year:2022},
    {class:"SWE 2",semester:"Fall",year:2023},
    {class:"Operating Systems",semester:"Spring",year:2023},
]
const {isAuth,token,dispatch}=useContext(AuthContext);
const handleClick=(e)=>{
    dispatch({type:'LOGOUT'})


}
  return (
    <div>
        <button onClick={handleClick}>Logout</button>
        <p>token:{token}</p>
        {isAuth && <p>Logged in</p>}
        {!isAuth && <p>Logged out</p>}
        <h1>Dashboard</h1>
        {
            data.map((data)=>{
                return(
                    <>
                    <h3>{data.class}</h3>
                    <p>{data.semester}, {data.year}</p>
                    <hr />
                    </>
                )
            })
        }
    </div>
  )
}
