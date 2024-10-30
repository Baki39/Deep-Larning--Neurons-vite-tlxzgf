import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HiddenLayersViz({ neuronCount = 400 }) {
  const groupRef = useRef();
  const neuronsRef = useRef([]);
  const SPHERE_RADIUS = 2;

  const { spherePoints, connections } = useMemo(() => {
    const points = [];
    const conns = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Generate points on a sphere using Fibonacci spiral
    for (let i = 0; i < neuronCount; i++) {
      const y = 1 - (i / (neuronCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      points.push(new THREE.Vector3(
        x * SPHERE_RADIUS,
        y * SPHERE_RADIUS,
        z * SPHERE_RADIUS
      ));
    }

    // Create connections between nearby points
    points.forEach((point, i) => {
      points.forEach((otherPoint, j) => {
        if (i < j) {
          const distance = point.distanceTo(otherPoint);
          if (distance < SPHERE_RADIUS * 0.8 && Math.random() < 0.1) {
            conns.push({
              points: [point, otherPoint],
              weight: Math.max(0.1, 1 - (distance / SPHERE_RADIUS))
            });
          }
        }
      });
    });

    return { spherePoints: points, connections: conns };
  }, [neuronCount]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      
      neuronsRef.current.forEach((neuron, i) => {
        if (neuron) {
          const time = state.clock.elapsedTime;
          const pulseScale = 1 + Math.sin(time * 0.5 + i * 0.02) * 0.05;
          neuron.scale.setScalar(pulseScale);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neurons */}
      {spherePoints.map((point, i) => (
        <mesh
          key={`neuron-${i}`}
          position={point}
          ref={el => neuronsRef.current[i] = el}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
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
      {connections.map(({ points: [start, end], weight }, i) => (
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
            opacity={weight * 0.3}
            linewidth={1}
          />
        </line>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight
        color="#00f7ff"
        intensity={0.2}
        distance={10}
        position={[3, 3, 3]}
      />
      <pointLight
        color="#00f7ff"
        intensity={0.15}
        distance={10}
        position={[-3, -3, -3]}
      />
    </group>
  );
}

export default HiddenLayersViz;