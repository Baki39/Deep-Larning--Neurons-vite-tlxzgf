import React from 'react';
import { motion } from 'framer-motion';

const HUDFrame = ({ children }) => {
  return (
    <motion.div 
      className="hud-frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="hud-scanner"></div>
      <div className="hud-grid-overlay"></div>
      {children}
    </motion.div>
  );
};

export default HUDFrame;