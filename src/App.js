import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage'
import EditProfilePage from './pages/EditProfilePage'
import Header from './components/Header'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit/:id" element={<EditProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
