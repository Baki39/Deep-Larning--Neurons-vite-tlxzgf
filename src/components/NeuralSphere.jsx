import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralSphere = ({ neurons, layerDepth }) => {
  const points = useMemo(() => {
    const temp = [];
    const sphereRadius = 5;
    
    for (let i = 0; i < neurons; i++) {
      const phi = Math.acos(-1 + (2 * i) / neurons);
      const theta = Math.sqrt(neurons * Math.PI) * phi;
      
      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);
      
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [neurons]);

  const connections = useMemo(() => {
    const temp = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() < 0.2) { // 20% chance of connection
          temp.push([points[i], points[j]]);
        }
      }
    }
    return temp;
  }, [points]);

  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {connections.map(([start, end], i) => (
        <line key={i}>
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
          <lineBasicMaterial color="#00ffff" opacity={0.2} transparent />
        </line>
      ))}
    </group>
  );
};

export default NeuralSphere;