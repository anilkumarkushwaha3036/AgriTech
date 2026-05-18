import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Add lenis css if needed, usually not required but safe

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Machinery from './pages/Machinery';
import Tools from './pages/Tools';
import AddEquipment from './pages/AddEquipment';
import Labor from './pages/Labor';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/machinery" element={<Machinery />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/labor" element={<Labor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
