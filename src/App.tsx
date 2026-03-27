import React, { JSX } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Speaker from './pages/Speaker';
import Navbar from './components/navbar/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speaker/:id" element={<Speaker />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;