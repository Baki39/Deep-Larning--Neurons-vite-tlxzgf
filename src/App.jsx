import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InputLayer from './pages/InputLayer';
import HiddenLayers from './pages/HiddenLayers';
import RelistroixNeuron from './pages/RelistroixNeuron';
import OutputLayer from './pages/OutputLayer';
import HUDFrame from './components/HUDFrame';
import './styles/app.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <HUDFrame>
          <nav className="hud-nav">
            <motion.div className="nav-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              <Link to="/" className="nav-link">Input Layer</Link>
              <Link to="/hidden" className="nav-link">Hidden Layers</Link>
              <Link to="/relistroix" className="nav-link">Relistroix Neuron</Link>
              <Link to="/output" className="nav-link">Output Layer</Link>
            </motion.div>
          </nav>

          <main className="hud-content">
            <Routes>
              <Route path="/" element={<InputLayer />} />
              <Route path="/hidden" element={<HiddenLayers />} />
              <Route path="/relistroix" element={<RelistroixNeuron />} />
              <Route path="/output" element={<OutputLayer />} />
            </Routes>
          </main>

          <div className="hud-overlay">
            <div className="corner-decoration top-left"></div>
            <div className="corner-decoration top-right"></div>
            <div className="corner-decoration bottom-left"></div>
            <div className="corner-decoration bottom-right"></div>
          </div>
        </HUDFrame>
      </div>
    </BrowserRouter>
  );
}

export default App;