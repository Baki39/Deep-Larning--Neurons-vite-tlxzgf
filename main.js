import './style.css';
import { NetworkData } from './src/components/NetworkData.js';
import { NetworkRenderer } from './src/components/Renderer.js';

// Initialize network data and renderer
const networkData = new NetworkData();
const container = document.querySelector('#app');
const renderer = new NetworkRenderer(container, networkData);

// Setup UI
container.innerHTML = `
  <div class="neural-network-container">
    <div class="control-panel">
      <input type="text" id="dataInput" placeholder="Enter YouTube URL" class="futuristic-input">
      <button id="processBtn" class="futuristic-button">Process Data</button>
    </div>
    <div id="network-viz"></div>
    <div class="metrics-panel">
      <div class="metric">
        <span>Processing Speed</span>
        <div class="metric-value">1.2 Ghz</div>
      </div>
      <div class="metric">
        <span>Accuracy</span>
        <div class="metric-value">98.5%</div>
      </div>
    </div>
  </div>
`;

// Initialize visualization
renderer.render();

// Add interaction
document.getElementById('processBtn').addEventListener('click', () => {
  renderer.update();
});