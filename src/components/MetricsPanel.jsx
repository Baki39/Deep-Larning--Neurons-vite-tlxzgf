import React from 'react';
import styled from '@emotion/styled';

const Panel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ffff;
  padding: 20px;
  border-radius: 5px;
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  pointer-events: auto;
`;

const MetricsPanel = ({ metrics }) => (
  <Panel>
    <h3>Network Metrics</h3>
    <p>Accuracy: {(metrics.accuracy * 100).toFixed(2)}%</p>
    <p>Loss: {metrics.loss.toFixed(4)}</p>
    <p>Epochs: {metrics.epochs}</p>
    <p>Learning Rate: {metrics.learningRate}</p>
  </Panel>
);

export default MetricsPanel;