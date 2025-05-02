import React from 'react';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Components/Dashboard';
function App() {

  return (
    <>
      <Navbar />
      <Dashboard />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}

export default App
