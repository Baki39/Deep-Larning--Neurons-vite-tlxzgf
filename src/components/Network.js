export class Network {
  constructor(config) {
    this.config = config;
    this.neurons = [];
    this.connections = [];
  }

  calculatePositions() {
    const layerSpacing = 150;
    this.neurons = [];
    this.connections = [];

    this.config.layers.forEach((layerSize, layerIndex) => {
      const layerX = layerIndex * layerSpacing;
      const neuronSpacing = 40;
      
      for (let i = 0; i < layerSize; i++) {
        const neuronY = i * neuronSpacing - (layerSize * neuronSpacing) / 2;
        this.neurons.push({
          x: layerX,
          y: neuronY,
          layer: layerIndex,
          value: 0
        });

        if (layerIndex < this.config.layers.length - 1) {
          const nextLayerSize = this.config.layers[layerIndex + 1];
          for (let j = 0; j < nextLayerSize; j++) {
            this.connections.push({
              source: {x: layerX, y: neuronY},
              target: {
                x: (layerIndex + 1) * layerSpacing,
                y: j * neuronSpacing - (nextLayerSize * neuronSpacing) / 2
              },
              weight: Math.random()
            });
          }
        }
      }
    });

    return {
      neurons: this.neurons,
      connections: this.connections
    };
  }

  propagateData(inputData) {
    // Simulate data propagation through the network
    this.neurons.forEach(neuron => {
      neuron.value = Math.random(); // Simulate activation
    });
    
    this.connections.forEach(conn => {
      conn.weight = Math.random(); // Simulate weight updates
    });

    return {
      neurons: this.neurons,
      connections: this.connections
    };
  }
}