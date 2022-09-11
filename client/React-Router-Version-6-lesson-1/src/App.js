import { BrowserRouter, Link, Route, Switch,Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
// pages
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Create from './components/create/Create'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'

function App() {
  const {isAuth}=useContext(AuthContext);
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Switch>
      <Route path='/dashboard'>{isAuth ?<Dashboard/>:<Redirect to='/signin'/>}</Route>
      <Route path='/create'>{isAuth ?<Create/>:<Redirect to='/signin'/>}</Route>
      <Route path='/signup'>{!isAuth ?<Signup/>:<Redirect to='/dashboard'/>}</Route>
      <Route path='/signin'>{!isAuth ?<Login/>:<Redirect to='/dashboard'/>}</Route>

     </Switch>
     </BrowserRouter>
    </div>
  )
}

export default App