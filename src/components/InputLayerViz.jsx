import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InputLayerViz({ isProcessing = false }) {
  const groupRef = useRef();
  const neuronsRef = useRef([]);
  const BRANCHES = 24;
  const NEURONS_PER_BRANCH = 16;
  const CENTER_RADIUS = 0.1;
  const MAX_RADIUS = 4;

  const { neurons, connections } = useMemo(() => {
    const neuronsList = [];
    const connectionsList = [];
    
    // Center neuron (subtle red)
    const centerPosition = new THREE.Vector3(0, 0, 0);
    neuronsList.push({
      position: centerPosition,
      color: new THREE.Color('#ff6b8e'),
      size: 0.12,
      intensity: 0.8 // Reduced from 2.0
    });

    // Create organic branches
    for (let b = 0; b < BRANCHES; b++) {
      const angle = (b / BRANCHES) * Math.PI * 2;
      const branchDirection = new THREE.Vector3(
        Math.cos(angle),
        Math.sin(angle),
        0
      );

      branchDirection.x += (Math.random() - 0.5) * 0.3;
      branchDirection.y += (Math.random() - 0.5) * 0.3;
      branchDirection.z += (Math.random() - 0.5) * 0.3;
      branchDirection.normalize();

      for (let n = 0; n < NEURONS_PER_BRANCH; n++) {
        const distance = CENTER_RADIUS + (n / NEURONS_PER_BRANCH) * MAX_RADIUS;
        const position = branchDirection.clone().multiplyScalar(distance);
        
        position.x += (Math.random() - 0.5) * 0.4;
        position.y += (Math.random() - 0.5) * 0.4;
        position.z += (Math.random() - 0.5) * 0.4;
        
        // More subtle color variations
        const hue = Math.random() > 0.8 ? 0.55 : 0.5;
        const neuronColor = new THREE.Color().setHSL(
          hue,
          0.7, // Reduced saturation
          0.5  // Reduced brightness
        );
        
        const size = 0.03 + Math.random() * 0.03; // Slightly smaller
        const intensity = 0.4 + Math.random() * 0.2; // Reduced intensity
        
        neuronsList.push({
          position,
          color: neuronColor,
          size,
          intensity
        });

        if (n > 0) {
          const prevNeuron = neuronsList[neuronsList.length - 2];
          connectionsList.push({
            start: prevNeuron.position,
            end: position,
            color: neuronColor.clone().multiplyScalar(0.4), // More subtle
            opacity: 0.15 + Math.random() * 0.1 // Reduced opacity
          });
        }

        if (n === 0 || Math.random() < 0.2) {
          connectionsList.push({
            start: centerPosition,
            end: position,
            color: new THREE.Color('#ff6b8e'),
            opacity: 0.1 + Math.random() * 0.15 // Reduced opacity
          });
        }
      }
    }

    return { neurons: neuronsList, connections: connectionsList };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005;
      neuronsRef.current.forEach((neuron, i) => {
        if (neuron) {
          const time = state.clock.elapsedTime;
          const pulseScale = 1 + Math.sin(time * 1.5 + i * 0.1) * 0.15; // Reduced pulse
          neuron.scale.setScalar(pulseScale);
          
          if (neuron.material) {
            neuron.material.emissiveIntensity = 
              neurons[i].intensity * (0.6 + Math.sin(time + i) * 0.1); // Reduced intensity
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {neurons.map((neuron, i) => (
        <mesh
          key={`neuron-${i}`}
          position={neuron.position}
          ref={el => neuronsRef.current[i] = el}
        >
          <sphereGeometry args={[neuron.size, 16, 16]} />
          <meshStandardMaterial
            color={neuron.color}
            emissive={neuron.color}
            emissiveIntensity={neuron.intensity}
            metalness={0.4} // Reduced
            roughness={0.6} // Increased
            toneMapped={false}
          />
        </mesh>
      ))}

      {connections.map((connection, i) => (
        <line key={`connection-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connection.start.x, connection.start.y, connection.start.z,
                connection.end.x, connection.end.y, connection.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={connection.color}
            transparent
            opacity={connection.opacity}
            linewidth={1}
          />
        </line>
      ))}

      <pointLight
        color="#ff6b8e"
        intensity={0.8} // Reduced
        distance={6}
        position={[0, 0, 0]}
      />
      <pointLight
        color="#00ffff"
        intensity={0.4} // Reduced
        distance={8}
        position={[2, 2, 2]}
      />
      <pointLight
        color="#00ffff"
        intensity={0.4} // Reduced
        distance={8}
        position={[-2, -2, -2]}
      />
    </group>
  );
}

export default InputLayerViz;