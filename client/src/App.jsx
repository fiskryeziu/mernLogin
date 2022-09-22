import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './page/Home'
import Login from './page/Login'
import Page from './page/Page'
import Register from './page/Register'

const App = () => {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
