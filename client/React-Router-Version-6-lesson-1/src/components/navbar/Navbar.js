import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <h2>College Planner</h2>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/create'>Create</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/signin'>Signin</Link>
     </nav>
  )
}
