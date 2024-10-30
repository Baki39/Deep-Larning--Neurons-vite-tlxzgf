import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function NeuralSphere() {
  const groupRef = useRef();
  const SPHERE_RADIUS = 4; // Increased from 3 to 4
  const POINT_COUNT = 150;
  const CONNECTION_PROBABILITY = 0.15;

  // Generate points on sphere surface
  const points = Array.from({ length: POINT_COUNT }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / POINT_COUNT);
    const theta = Math.sqrt(POINT_COUNT * Math.PI) * phi;

    return new THREE.Vector3(
      SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi),
      SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi),
      SPHERE_RADIUS * Math.cos(phi)
    );
  });

  // Generate connections
  const connections = [];
  points.forEach((point, i) => {
    points.forEach((target, j) => {
      if (i < j && Math.random() < CONNECTION_PROBABILITY) {
        const distance = point.distanceTo(target);
        if (distance < SPHERE_RADIUS * 1.2) {
          connections.push([point, target]);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Neurons */}
      {points.map((point, i) => (
        <mesh key={`point-${i}`} position={point}>
          <sphereGeometry args={[0.04, 8, 8]} /> {/* Increased from 0.03 to 0.04 */}
          <meshStandardMaterial
            color="#00f7ff"
            emissive="#00f7ff"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map(([start, end], i) => (
        <line key={`connection-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                start.x, start.y, start.z,
                end.x, end.y, end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00f7ff"
            transparent
            opacity={0.2}
            linewidth={1}
          />
        </line>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight
        color="#00f7ff"
        intensity={0.2}
        distance={12} // Increased from 10 to 12
        position={[4, 4, 4]} // Increased from [3, 3, 3]
      />
      <pointLight
        color="#00f7ff"
        intensity={0.15}
        distance={12} // Increased from 10 to 12
        position={[-4, -4, -4]} // Increased from [-3, -3, -3]
      />
    </group>
  );
}

function RelistroixNeuron() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full relative"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}> {/* Adjusted camera position from 8 to 10 */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <NeuralSphere />
          <EffectComposer>
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </motion.div>
  );
}

export default RelistroixNeuron;