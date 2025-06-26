import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Profile from './components/Profile';
import Skills from './components/Skills';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {""}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>

      
    </div>
    
  );
}

export default App;
