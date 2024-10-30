// Update bloom and glow settings in NeuralDisc
const material = new THREE.MeshStandardMaterial({
  color: '#00f7ff',
  emissive: '#00f7ff',
  emissiveIntensity: 0.6, // Reduced from 1
  metalness: 0.5,
  roughness: 0.2,
});

// Update in the render method
<meshStandardMaterial
  {...material}
  emissiveIntensity={0.4} // Reduced glow
  toneMapped={false}
/>