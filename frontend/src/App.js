import React from 'react';
import Index from './pages/Index'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import './style.css'
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userDashboard' element={<UserDashboard />} />
        <Route path='/*' element={<Dashboard />} />
      </Routes>
    </>
  )
}
export default App