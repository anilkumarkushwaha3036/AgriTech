import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import AddEquipment from './pages/AddEquipment';
import Labor from './pages/Labor';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tools" element={<Marketplace />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/labor" element={<Labor />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
