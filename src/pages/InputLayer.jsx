import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import InputLayerViz from '../components/InputLayerViz';
import styled from '@emotion/styled';

const StyledInputLayer = styled(motion.div)`
  .input-controls {
    margin: 20px 0;
    padding: 0 20px;
  }

  .file-drop-zone {
    border: 2px dashed #4a90e2;
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(74, 144, 226, 0.1);
  }

  .file-drop-zone:hover {
    border-color: #357abd;
    background: rgba(74, 144, 226, 0.2);
  }

  .drop-zone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .icon {
    font-size: 48px;
  }

  .selected-file {
    color: #4a90e2;
    margin-top: 10px;
  }

  .data-formats {
    padding: 20px;
    margin-top: 20px;
  }

  .format-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .format-category {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 15px;
  }

  .format-category h4 {
    color: #4a90e2;
    margin-bottom: 10px;
  }

  .format-category ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .format-category li {
    padding: 5px 0;
    color: #e0e0e0;
  }
`;

function InputLayer() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <StyledInputLayer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hud-panel"
    >
      <h2 className="hud-title">Input Layer Analysis</h2>
      
      <div className="input-controls">
        <div 
          className="file-drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            accept="image/*,video/*,audio/*"
          />
          <div className="drop-zone-content">
            <span className="icon">📁</span>
            <p>Drop files here or click to select</p>
            {selectedFile && (
              <p className="selected-file">Selected: {selectedFile.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="visualization-panel" style={{ height: '600px' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <InputLayerViz isProcessing={isProcessing} />
          <EffectComposer>
            <Bloom 
              intensity={0.5}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              radius={0.6}
            />
          </EffectComposer>
        </Canvas>
      </div>

      <div className="data-formats">
        <h3>Supported Input Formats</h3>
        <div className="format-grid">
          <div className="format-category">
            <h4>Images</h4>
            <ul>
              <li>JPEG/JPG</li>
              <li>PNG</li>
              <li>WebP</li>
              <li>GIF</li>
              <li>SVG</li>
            </ul>
          </div>
          <div className="format-category">
            <h4>Video</h4>
            <ul>
              <li>MP4</li>
              <li>WebM</li>
              <li>MOV</li>
              <li>AVI</li>
            </ul>
          </div>
          <div className="format-category">
            <h4>Audio</h4>
            <ul>
              <li>MP3</li>
              <li>WAV</li>
              <li>OGG</li>
              <li>FLAC</li>
            </ul>
          </div>
          <div className="format-category">
            <h4>Data</h4>
            <ul>
              <li>CSV</li>
              <li>JSON</li>
              <li>XML</li>
              <li>TXT</li>
            </ul>
          </div>
        </div>
      </div>
    </StyledInputLayer>
  );
}

export default InputLayer;