import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OutputLayerViz() {
  const neuronRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    if (neuronRef.current) {
      neuronRef.current.rotation.y += 0.01;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group>
      {/* Central neuron */}
      <mesh ref={neuronRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00f7ff"
          emissive="#00f7ff"
          emissiveIntensity={0.6}
          metalness={0.5}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        {[1, 1.5, 2].map((radius, index) => (
          <mesh key={index} rotation-x={Math.PI / (index + 2)}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#00f7ff"
              emissive="#00f7ff"
              emissiveIntensity={0.4}
              metalness={0.6}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Point lights */}
      <pointLight 
        color="#00f7ff" 
        intensity={0.5}
        distance={2.5}
        position={[1, 1, 1]}
      />
      <pointLight 
        color="#00f7ff" 
        intensity={0.3}
        distance={2}
        position={[-1, -1, -1]}
      />
    </group>
  );
}

export default OutputLayerViz;