import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OutputLayerViz from '../components/OutputLayerViz';

function OutputLayer() {
  // ... rest of the component code remains the same ...

  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      {/* ... other JSX ... */}

      <div className="visualization-panel" style={{ height: '600px' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <OutputLayerViz />
          <EffectComposer>
            <Bloom 
              intensity={0.5} // Reduced from 1.5
              luminanceThreshold={0.3} // Increased from 0.1
              luminanceSmoothing={0.9}
              radius={0.6} // Reduced from 0.8
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* ... rest of the component remains the same ... */}
    </motion.div>
  );
}

export default OutputLayer;