import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Component/Header.jsx'
import Home from './Component/Home'
import UserList from './Component/UserList'
import AddUser from './Component/AddUser.jsx'
import Footer from './Component/Footer.jsx'
import EditUser from './Component/EditUser.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/UserList" element={ <UserList/> } />
          <Route path="/AddUser" element={ <AddUser/> } />
          <Route path="/EditUser/:id" element={ <EditUser/> } />
        </Routes>
        <Footer />
        
      </div>
    </>
  )
}

export default App
