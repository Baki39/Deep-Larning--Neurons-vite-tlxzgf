import React from 'react';
import styled from '@emotion/styled';
import useNetworkStore from '../store/networkStore';

const ControlPanel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ffff;
  padding: 20px;
  border-radius: 5px;
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  pointer-events: auto;
`;

const Button = styled.button`
  background: transparent;
  border: 1px solid #00ffff;
  color: #00ffff;
  padding: 5px 15px;
  margin: 5px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
  }
`;

const Controls = () => {
  const { neurons, layerDepth, setNeurons, setLayerDepth } = useNetworkStore();

  return (
    <ControlPanel>
      <div>
        <h3>Network Controls</h3>
        <div>
          <p>Neurons: {neurons}</p>
          <Button onClick={() => setNeurons(Math.max(5, neurons - 5))}>-</Button>
          <Button onClick={() => setNeurons(neurons + 5)}>+</Button>
        </div>
        <div>
          <p>Layer Depth: {layerDepth}</p>
          <Button onClick={() => setLayerDepth(Math.max(1, layerDepth - 1))}>-</Button>
          <Button onClick={() => setLayerDepth(layerDepth + 1)}>+</Button>
        </div>
      </div>
    </ControlPanel>
  );
};

export default Controls;