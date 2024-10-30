import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import useNetworkStore from '../store/networkStore';
import NeuralSphere from '../components/NeuralSphere';
import MetricsPanel from '../components/MetricsPanel';
import Controls from '../components/Controls';

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background: #000;
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
`;

const HUDOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
`;

const HiddenLayers = () => {
  const { neurons, layerDepth, metrics } = useNetworkStore();
  const canvasRef = useRef();

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Canvas ref={canvasRef}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <NeuralSphere neurons={neurons} layerDepth={layerDepth} />
        
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>

      <HUDOverlay>
        <MetricsPanel metrics={metrics} />
        <Controls />
      </HUDOverlay>
    </Container>
  );
};

export default HiddenLayers;