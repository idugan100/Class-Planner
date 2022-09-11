import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.css'


export default function Navbar() {
  const {isAuth}=useContext(AuthContext);
  return (
    <nav className='navbar'>
      <h2>College Planner</h2>
      {isAuth && <Link to='/dashboard'>Dashboard</Link>}
      {isAuth &&<Link to='/create'>Create</Link>}
      {!isAuth && <Link to='/signup'>Signup</Link>}
      {!isAuth && <Link to='/signin'>Signin</Link>}
     </nav>
  )
}
